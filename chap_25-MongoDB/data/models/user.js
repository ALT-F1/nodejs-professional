/*
map into the user collection in the database.

you need to use this model in your route listeners.

*/
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

var User = mongoose.model('User', UserSchema);

module.exports = User;