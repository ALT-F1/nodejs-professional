/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path');

var app = express();

//db stuffs
console.log("Don't forget to update the file app.js with your URL to access the mongodb !!!");
//var dbURL = 'mongodb://<login>:<password>@mongohq.com:<port>/<database name>';
var dbURL = 'mongodb://ab:1234567890POIUYTREZA@dharma.mongohq.com:10016/amia-systems';

require('mongoose').connect(dbURL);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('my very secret cookie key'));
app.use(express.session({
	secret: 'my secret session key',
	maxAge: 3600000
}));

//routes

require('./routes/session')(app);
require('./routes/index')(app);
require('./routes/user')(app);
require('./routes/article')(app);


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});