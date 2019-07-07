import { readOnly } from '@ember/object/computed';
import DS from "ember-data";
import { Model } from 'ember-pouch';

let chat = Model.extend({
  title: DS.attr('string', {defaultValue: ""}),
  user: DS.belongsTo('user'),
  date: DS.attr('date'),
  excerpt: DS.attr('string', {defaultValue: ""}),
  body: DS.attr('string', {defaultValue: ""}),

  // alias necessary for `components/blog-posts.hbs` usage of:
  // .property('arrangedContent.@each.title', 'arrangedContent.@each.authorName', 'query'),
  // as doing `arrangedContent.@each.author.name` returns https://github.com/DockYard/ember-composable-helpers/issues/177
  userName: readOnly('user.name')
});

export default chat;
