import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject } from '@ember/controller';

export default Controller.extend({
  chat: inject('chats.chat'),
  router: service(),
  currentUser: service(),
  session: service(),

  page: 1,
  perPage: 5,
  query: '',

  queryParams: ["page", "perPage", "query"],

  actions: {
    createChat: function() {
      console.log('User', this.get('currentUser.username'));

      this.store.queryRecord('user', {filter:{ couchUser: this.currentUser.username}}).then((cu) => {
        console.log('userId', cu.id);
        this.chat.set('globals.isEditing', true);
        let newChat = this.store.createRecord('chat');
        newChat.set('date', new Date());
        newChat.set('user', cu);
        this.router.transitionTo('chats.chat', newChat.save());
      });
    }
  }
});
