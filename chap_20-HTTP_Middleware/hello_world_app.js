/*
creating a Connect HTTP server and initializing it with the HelloWorld middleware
component
*/ 

var connect = require('connect');
var PORT_LISTENER = 8081;

console.log("I am listening to this port: http://localhost:", PORT_LISTENER);

// import middlewares
var errorCreator = require('./error_creator');
var errorHandler = require('./error_handler');
var saveRequest = require('./save_request');
var writeHeader = require('./write_header');
var replyText = require('./reply_text');


var app = connect.createServer(
	//errorCreator(),
	saveRequest('_generated/' + '/requests'),
	writeHeader('X-Powered-By', 'Node'),
	replyText('Hello World!'),
	errorHandler());

app.listen(PORT_LISTENER);