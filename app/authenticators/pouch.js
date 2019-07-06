import Pouch from 'ember-simple-auth-pouch/authenticators/pouch';

export default Pouch.extend({
  getDb() {
      let pouchAdapter = this.store.adapterFor('application');//getOwner(this).lookup(`adapter:${pouchAdapterName}`);

    return pouchAdapter.remoteDb;
  }
});
