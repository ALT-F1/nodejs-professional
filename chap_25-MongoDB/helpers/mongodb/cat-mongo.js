var mongoose = require('mongoose');
mongoose.connect('mongodb://<login>:<pwd>@mongohq.com:<port>/<database name>');

var Cat = mongoose.model('Cat', {
	name: String
});

var kitty = new Cat({
	name: 'Zildjian'
});
kitty.save(function(err) {
	if (err) { // ...
		console.log('meow');
	}
});