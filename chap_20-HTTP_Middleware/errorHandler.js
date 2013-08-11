/*
Connect comes with a more elaborate error handler. One of its capabilities is using content negotiation
to understand what output is best. For instance, if the client accepts the text/html content type, it
outputs the content as HTML. If the client accepts application/json, it will output the error as
a JSON-encoded object containing the error and stack properties. If any of these content types is
not supported by the client, the error handler outputs the error as plaintext.
*/
var PORT_LISTENER = 8083;

console.log("I am listening to this port: http://localhost:%s", PORT_LISTENER);

var connect = require('connect');
var app = connect();

connect.errorHandler.title = 'My Application';

app.use(function(req, res, next) {
	next(new Error('Hey!'));
});
// actually respond
app.use(function(req, res) {
	res.end('Hello World!');
});
app.use(connect.errorHandler());
app.listen(PORT_LISTENER);