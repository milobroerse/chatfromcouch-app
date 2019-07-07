import DS from "ember-data";
import { Model } from 'ember-pouch';

let user = Model.extend({
  name: DS.attr('string', {defaultValue: ""}),
  couchUser: DS.attr('string', {defaultValue: ""}),
  chats: DS.hasMany('chats')
});

export default user;
