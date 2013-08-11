/*
Parsing the Request Body

how to test?

curl -X POST -F a=b -F c=d http://localhost:8086

curl -d '{"a":"b","c":"d"}' http://localhost:8086

curl -d '{"a":"b","c":"d"}' -H 'Content-Type: application/json' http://localhost:8086
*/

var PORT_LISTENER = 8086;

console.log("I am listening to this port: http://localhost:%s", PORT_LISTENER);

var connect = require('connect');
var app = connect();
// setup the middlewares

app.use(connect.logger(':method :req[content-type]'));
app.use(connect.bodyParser());
// actually respond
app.use(function(req, res) {
	res.end(JSON.stringify(req.body));
});
app.listen(PORT_LISTENER);