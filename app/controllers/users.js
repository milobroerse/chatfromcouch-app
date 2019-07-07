import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject } from '@ember/controller';

export default Controller.extend({
  user: inject('users.user'),
  router: service(),

  page: 1,
  perPage: 5,

  queryParams: ["page", "perPage"],

  actions: {
    createUser: function() {
      this.user.set('globals.isEditing', true);
      let newUser = this.store.createRecord('user');
      this.router.transitionTo('users.user', newUser.save());
    }
  }
});
