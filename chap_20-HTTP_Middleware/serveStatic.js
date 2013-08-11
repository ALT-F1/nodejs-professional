/*
the static file server should look for files under the public directory. If a
file is found, that file is served, and the middleware chain is interrupted.
*/
var PORT_LISTENER = 8084;

console.log("I am listening to this port: http://localhost:%s", PORT_LISTENER);
console.log("Try this, we are serving files under the 'public' directory: http://localhost:%s/public/alt-f1_up_to_40_percent_cheaper_than_big_four.png", PORT_LISTENER);

var connect = require('connect');
var app = connect();
// setup the static file server
app.use(connect.static(__dirname + '/public'));
// actually respond
app.use(function(req, res) {
	res.end('Hello World!');
});
app.listen(PORT_LISTENER);