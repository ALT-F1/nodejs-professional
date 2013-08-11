/*
the static fi le server should look for fi les under the public directory. If a
file is found, that fi le is served, and the middleware chain is interrupted.
*/
var PORT_LISTENER = 8084;

console.log("I am listening to this port: http://localhost:", PORT_LISTENER);

var connect = require('connect');
var app = connect();
// setup the static file server
app.use(connect.static(__dirname + '/public'));
// actually respond
app.use(function(req, res) {
	res.end('Hello World!');
});
app.listen(PORT_LISTENER);