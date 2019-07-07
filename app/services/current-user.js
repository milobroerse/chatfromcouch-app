import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
	session: service(),

	username: alias('session.data.username'),

	roles: alias('session.data.authenticated.roles'),

	isAdmin: computed('roles', function() {
		let roles = (this.roles || []);
		return roles.includes('_admin');
	})

});
