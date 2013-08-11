/*
 * Session Routes
 */

var User = require('../data/models/user');
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
			title: "Log in"
		});
	});

	app.post('/session', notLoggedIn, function(req, res, next) {
		console.log('app.post(\'/session\'): search for req.body.username %s',req.body.username);
		console.log('app.post(\'/session\'): search for req.body.password %s',req.body.password);
		User.findOne({
				username: req.body.username,
				password: req.body.password
			},
			function(err, user) {
				if (err) {
					return next(err);
				}
				if (user) {
					req.session.user = user;
					console.log('app.post(\'/session\'): pass through session/new - user found: %s', req.session.user.username);
					console.log('app.post(\'/session\'): req.session.user : ' + req.session.user);
					console.log('app.post(\'/session\'): req.body.username : ' + req.body.username);
					res.redirect('/users');
				} else {
					res.redirect('session/new');
				}
			});
	});
	app.del('/session', function(req, res /*not used, next*/ ) {
		req.session.destroy();
		res.redirect('/users');
	});
};