/*
 * User Routes
 * The user routes now using the user Mongoose model.
 * the “Next” page link appears even when there are no more users on the next page. You can fi x this by counting all the user records in the collection and figuring out how many pages are left.
 */

var User = require('../data/models/user');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_user');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');

var async = require('async');

module.exports = function(app) {

  var maxUsersPerPage = 3;

  app.get('/users', function(req, res, next) {
    console.log('app.get("/users"): pass through');
    var page = req.query.page && parseInt(req.query.page, 10) || 0;
    console.log('app.get("/users"): req.query.page: %s', page);
    //sort ascending by name
    //pagination: skip and limit options to retrieve only one page worth of data:
    async.parallel([
        function(next) {
          console.log('app.get("/users"): before User.count');
          User.count(next);
          console.log('app.get("/users"): after User.count');
        },
        function(next) {
          console.log('app.get("/users"): before User.find');
          User.find({})

          .sort({
            name: 1
          })

          .skip(page * maxUsersPerPage)
            .limit(maxUsersPerPage)
            .exec(next);
          console.log('app.get("/users"): after User.find');
        }
      ],


      /*
      final callback is called when both operations (user.find and user.count) are finished or when an erro occurs
      Outcome
        two (2) results arrays are sent back. first one containing the count and the second one containing the users list
      */

      function(err, results) {
        if (err) {
          return next(err);
        }
        var count = results[0];
        var users = results[1];

        var lastPage = (page + 1) * maxUsersPerPage >= count;
        console.log('app.get("/users"): is it the last page? %s', lastPage);

        res.render('users/index', {
          title: 'Users',
          users: users,
          page: page,
          lastPage: lastPage
        });
      }
    );
  });

  app.get('/users/new', notLoggedIn, function(req, res) {
    console.log('pass through app.get("/users/new")');
    res.render('users/new', {
      title: "New User"
    });
  });

  app.get('/users/:name', loadUser, function(req, res, next ) {
    console.log('pass through app.get("/users/:name"): req.user = %s', req.user);
    req.user.recentArticles(function(err, articles) {
      if (err) {
        return next(err);
      }
      res.render('users/profile', {
        title: 'User profile',
        user: req.user,
        recentArticles: articles
      });
    });
  });

  app.post('/users', notLoggedIn, function(req, res, next) {
    console.log('pass through app.post("/users")');

    User.create(req.body, function(err) {
      if (err) {
        if (err.code === 11000) {
          res.send('Conflict - Duplicate Key Error', 409);
        } else {
          if (err.name === 'ValidationError') {
            return res.send(Object.keys(err.errors).map(function(errField) {
              return err.errors[errField].message;
            }).join('. '), 406);
          } else {
            next(err);
          }
        }
        return;
      }
      res.redirect('/users');
    });
  });

  app.del('/users/:name', loadUser, restrictUserToSelf, function(req, res, next) {
    console.log('pass through app.del("/users/:name")');
    req.user.remove(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/users');
    });
  });
};