import Controller, { inject }  from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  chats: inject(),
  router: service(),

  actions: {
    saveChat: function() {
      this.model.save();
    },

    deleteChat: function() {
      this.model.destroyRecord().then(function() {
        this.router.transitionTo('chats');
      }.bind(this));
    }
  }
});
