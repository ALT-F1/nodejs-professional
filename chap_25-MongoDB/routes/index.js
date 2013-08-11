/*
 * GET home page.
 */

module.exports = function(app) {
	app.get('/', function(req, res) {
		console.log('inside app.get("/")');
		res.render('index', {
			title: 'The web app running Express Node Jade MongoDB'
		});
	});
};