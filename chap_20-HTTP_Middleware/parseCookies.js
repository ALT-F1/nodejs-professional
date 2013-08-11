/*
 
 */

var PORT_LISTENER = 8087;

console.log("I am listening to this port: http://localhost:%s", PORT_LISTENER);

var connect = require('connect');
var app = connect();
// setup middleware
app.use(connect.cookieParser());
// actually respond
app.use(function(req, res) {
	res.end(JSON.stringify(req.cookies));
});
app.listen(PORT_LISTENER);