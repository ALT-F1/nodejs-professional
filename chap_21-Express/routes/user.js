/*
 * User Routes
 */

var users = require('../data/users');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_user');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');

module.exports = function(app) {

  app.get('/users', function(req, res) {
    console.log('pass through app.get("/users")');
    res.render('users/index', {
      title: 'Users',
      users: users
    });
  });

  app.get('/users/new', notLoggedIn, function(req, res) {
    console.log('pass through app.get("/users/new")');
    res.render('users/new', {
      title: "New User"
    });
  });

  app.get('/users/:name', loadUser, function(req, res) {
    console.log('pass through app.get("/users/:name")');
    res.render('users/profile', {
      title: 'User profile',
      user: req.user
    });

  });

  app.post('/users', notLoggedIn, function(req, res) {
    console.log('pass through app.post("/users")');
    if (users[req.body.username]) {
      res.send('Conflict', 409);
    } else {
      users[req.body.username] = req.body;
      res.redirect('/users');
    }
  });

  app.del('/users/:name', loadUser, restrictUserToSelf, function(req, res) {
    console.log('pass through app.del("/users/:name")');

    delete users[req.params.name];
    res.redirect('/users');

  });

};