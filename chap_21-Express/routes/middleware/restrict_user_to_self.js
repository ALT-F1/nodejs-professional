function restrictUserToSelf(req, res, next) {
	if (!req.session.user || req.session.user.username !== req.user.username) {
		res.send('You are not Authorized to perform this operation, logout and login using the right user', 401);
	} else {
		next();
	}
}
module.exports = restrictUserToSelf;