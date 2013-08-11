/*
setting up the query string parser middleware and then replying with the content of
req.query.
*/
var PORT_LISTENER = 8085;

console.log("I am listening to this port: http://localhost:%s", PORT_LISTENER);

var connect = require('connect');
var app = connect();
// setup the query middleware
app.use(connect.query());
// actually respond
app.use(function(req, res) {
	res.end(JSON.stringify(req.query));
});
app.listen(PORT_LISTENER);