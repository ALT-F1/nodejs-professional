/*
connect to mongodb
*/
var User = require('../../data/models/user');

function loadUser(req, res, next) {
	console.log('loadUser: pass through');
	User.findOne({
		username: req.params.name
	}, function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.send('Not found', 404);
		}

		req.user = user;
		console.log('loadUser: Find a user:', req.user);	
		next();
	});
}

module.exports = loadUser;