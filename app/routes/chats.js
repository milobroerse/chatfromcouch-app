import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    let store = this.store;
    return hash({
      model: store.findAll('chat'),
      users: store.findAll('user')
    });
  },

  setupController: function(controller, models){
    controller.setProperties(models);
  },

  redirect: function(model, transition){
    if(transition.targetName === 'chats.index'){
      if(model.model.get('length') !== 0) {
        this.transitionTo('chats.chat', model.model.sortBy('date').reverse().get('firstObject'));
      }
    }
  }

});
