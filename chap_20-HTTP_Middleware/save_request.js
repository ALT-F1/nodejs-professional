/*
A middleware that saves every request into a fi le.

Testing: 
curl -T app/hello_world_app.js http://localhost:8081

Expected outcome:
_generated/requests/*.txt should contain the header and the content of the hello_world_app.js file

PUT /hello_world_app.js
{ 'user-agent': 'curl/7.21.4 (universal-apple-darwin11.0) libcurl/7.21.4 OpenSSL/0.9.8x zlib/1.2.5',
  host: 'localhost:8081',
  accept: '*/
/*',
  'content-length': '556',
  expect: '100-continue' }

*/

var fs = require('fs'),
	path = require('path'),
	util = require('util');
var mkdirp = require('mkdirp');

function saveRequest(dir) {
	return function(req, res, next) {
		mkdirp(dir, function(err) {
			if (err) console.error(err)
			else {
				var fileName = path.join(dir, Date.now().toString() + '_' +
					Math.floor(Math.random() * 100000) + '.txt');
				var file = fs.createWriteStream(fileName);
				file.write(req.method + ' ' + req.url + '\n');
				file.write(util.inspect(req.headers) + '\n');
				req.pipe(file);
				next();
			}
		});
	};
}
module.exports = saveRequest;