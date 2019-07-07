import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject } from '@ember/controller';

export default Controller.extend({
  chat: inject('chats.chat'),
  router: service(),

  page: 1,
  perPage: 5,
  query: '',

  queryParams: ["page", "perPage", "query"],

  actions: {
    createChat: function() {
      this.chat.set('globals.isEditing', true);
      let newChat = this.store.createRecord('chat');
      newChat.set('date' , new Date());
      this.router.transitionTo('chats.chat', newChat.save());
    }
  }
});
