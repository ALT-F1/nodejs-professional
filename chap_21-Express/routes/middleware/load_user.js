var users = require('../../data/users');

function loadUser(req, res, next) {
	var user = req.user = users[req.params.name];
	if (!user) {
		res.send('Not found', 404);
	} else {
		next();
	}
}
module.exports = loadUser;