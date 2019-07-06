import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('secret');
  this.route('login');
  this.route('chats', function() {
    this.route('chat', { path: ':chat_id' });
  });
  this.route('users', function() {
    this.route('user', { path: ':user_id' });
  });
});

export default Router;
