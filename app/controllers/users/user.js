import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    saveUser: function() {
      this.model.save();
    },

    deleteUser: function() {
      this.model.destroyRecord().then(function() {
        this.router.transitionTo('users');
      }.bind(this));
    }
  }
});
