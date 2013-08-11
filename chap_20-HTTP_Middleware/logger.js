/*
middleware component for logging some request and response data
*/
var connect = require('connect');

var PORT_LISTENER = 8082;

console.log('I am listening to this port: http://localhost:%s', PORT_LISTENER);

var app = connect();

// setup logger middleware
var format = ':method :url - :status - :response-time ms';
app.use(connect.logger(format));

// actually respond
app.use(function(req, res) {
	res.end('Hello World! look into the command line logs !!! we formatted the logs');
});
app.listen(PORT_LISTENER);