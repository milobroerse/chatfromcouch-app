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

      this.chat.set('globals.isEditing', true);
      let newChat = this.store.createRecord('chat');
      newChat.set('date', new Date());
      this.currentUser.user.then((user) => newChat.set('user', user));
      this.router.transitionTo('chats.chat', newChat.save());
    }
  }
});
