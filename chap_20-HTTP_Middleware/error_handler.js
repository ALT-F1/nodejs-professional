/*
An error handling middleware.
*/

function errorHandler() {
	return function(err, req, res, next) {
		if (err) {
			res.writeHead(500, {
				'Content-Type': 'text/html'
			});
			res.end('<h1>Oh no! We have an error!</h1>\n<pre>' + err.stack + '</pre>');
		} else {
			next();
		}
	};
}
module.exports = errorHandler;