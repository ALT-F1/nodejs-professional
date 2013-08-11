/*
 * Session Routes
 */

var users = require('../data/users');
var notLoggedIn = require('./middleware/not_logged_in');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        console.log('res.locals.session : ' + res.locals.session);
        next();
    });
    app.get('/session/new', notLoggedIn, function(req, res) {
        console.log('pass through session/new');
        res.render('session/new', {
            title: "Log in",
            users: users
        });
    });

    app.post('/session', notLoggedIn, function(req, res) {
        if (users[req.body.username] &&
            users[req.body.username].password === req.body.password) {
            req.session.user = users[req.body.username];
            res.redirect('/users');
        } else {
            res.redirect('/session/new');
        }
    });
    app.del('/session', function(req, res /*not used, next*/ ) {
        req.session.destroy();
        res.redirect('/users');
    });
};