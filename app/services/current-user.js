import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
	session: service(),
  store: service(),

	username: alias('session.data.authenticated.name'),

	roles: alias('session.data.authenticated.roles'),

  user: computed('username', function() {
    return this.store.queryRecord('user', {filter:{ couchUser: this.username }}).then((user) => {
      if (user){
        console.log('Existing User', user.couchUser);
        return user;
      } else {
        console.log('New User', this.username);
        let newUser = this.store.createRecord('user');
        newUser.set('name', this.username);
        newUser.set('couchUser', this.username);
        return newUser.save();
      }
    });
  }),

	isAdmin: computed('roles', function() {
		let roles = (this.roles || []);
		return roles.includes('_admin');
	})

});
