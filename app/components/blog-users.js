import Component from '@ember/component';
import { sort, alias } from '@ember/object/computed';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Component.extend({
  usersSorting: Object.freeze(['name']),
  arrangedContent: sort('users', 'usersSorting'),

  pagedContent: pagedArray('arrangedContent', {
    page: alias('parent.page'),
    perPage: alias('parent.perPage')
  }),

  actions: {
    createUser: function() {
      console.log('x');
      this.createAction();
    }
  }
});
