/*
 * GET home page.
 */

module.exports = function(app) {
	app.get('/', function(req, res) {
		console.log('inside app.get("/")');
		res.render('index', {
			title: 'to the wep app using Node, Express and Jade'
		});
	});
};