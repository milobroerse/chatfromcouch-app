import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Adapter.extend({

  session: service(),
  cloudState: service(),
  refreshIndicator: service(),

  init() {
    this._super(...arguments);

    const localDb = config.local_couch || 'chatfromcouch';

    assert('local_couch must be set', !isEmpty(localDb));

    const db = new PouchDB(localDb);
    this.set('db', db);

    // If we have specified a remote CouchDB instance, then replicate our local database to it
    if ( config.remote_couch ) {
      const remoteDb = new PouchDB(config.remote_couch, {
        fetch: function (url, opts) {
          opts.credentials = 'include';
          return PouchDB.fetch(url, opts);
        }
      });

      const replicationOptions = {
        live: true,
        retry: true
      };
      let replicationFromHandler = null;
      let replicationToHandler = null;

      remoteDb.on('loggedin', () => {
        //console.log('logged in!');

        replicationFromHandler = db.replicate.from(remoteDb, replicationOptions);
        replicationFromHandler.on('paused', (err) => {
          this.cloudState.setPull(!err);
        }).on('active',() => {
          this.cloudState.setPull(true);
        });

        replicationToHandler = db.replicate.to(remoteDb, replicationOptions);
        replicationToHandler.on('paused',(err) => {
          this.cloudState.setPush(!err);
        }).on('active',() => {
          this.cloudState.setPull(true);
        }).on('error',() => {
          this.session.invalidate();//mark error by loggin out
        });
      });

      remoteDb.on('loggedout', () => {
        //console.log('logged out!');
        if (replicationFromHandler){
          replicationFromHandler.cancel();
          replicationFromHandler = null;
        }
        if (replicationToHandler) {
          replicationToHandler.cancel();
          replicationToHandler = null;
        }
        this.cloudState.setPush(false);
        this.cloudState.setPull(false);
      });

      this.set('remoteDb', remoteDb);
    }

    return this;
  },

  unloadedDocumentChanged: function(obj) {
    this.refreshIndicator.kickSpin();

    let store = this.store;
    let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));
    this.db.rel.find(recordTypeName, obj.id).then(function(doc) {
      store.pushPayload(recordTypeName, doc);
    });
  }
});
