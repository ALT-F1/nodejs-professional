/*
 
 */

var PORT_LISTENER = 8088;

console.log("I am listening to this port: http://localhost:%s", PORT_LISTENER);

var connect = require('connect');
var format = require('util').format;
var app = connect();
// setup middleware
app.use(connect.query());
app.use(connect.cookieParser('this is my secret string'));
app.use(connect.session({
	cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}));
// actually respond
app.use(function(req, res) {
	for (var name in req.query) {
		req.session[name] = req.query[name];
	}
	res.end(format(req.session) + '\n');
});
app.listen(PORT_LISTENER);