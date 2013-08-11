function notLoggedIn(req, res, next) {
	if (req.session.user) {
		res.send('You can\'t perform this operation if logged. Please logout and try again.', 401);
	} else {
		next();
	}
}
module.exports = notLoggedIn;