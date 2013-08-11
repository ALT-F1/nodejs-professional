/*
create a schema module to defi ne what a user document will look like.
defining a basic schema with three fields, all of them strings.

user schema with a unique index
*/

var mongoose = require('mongoose');

// simple but incomplete email regexp:
var emailRegexp = /.+\@.+\..+/;

var TIMESPAN_YEAR = 31536000000 // == 1000 * 60 * 60 * 24 * 365 or one year in milliseconds 
var TIMESPAN_18_YEARS = 18 * TIMESPAN_YEAR;

function validate_18_years_old_or_more(date) {
	return (Date.now() - date.getTime()) > TIMESPAN_18_YEARS;
}

var request = require('request');

function twitterHandleExists(handle, done) {
	request('http://twitter.com/' + encodeURIComponent(handle), function(err, res) {
		if (err) {
			console.error(err);
			return done(false);
		}
		if (res.statusCode > 299) {
			done(false);

		} else {
			done(true);
		}
	});
}

function filterTwitterHandle(handle) {
	if (!handle) {
		return;
	}
	handle = handle.trim();
	if (handle.indexOf('@') === 0) {
		handle = handle.substring(1);
	}
	return handle;
}

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	name: mongoose.Schema.Types.Mixed,
	/*
	name: {
		first: String,
		last: String
	},
	*/
	password: String,
	email: {
		type: String,
		required: true,
		match: emailRegexp
	},
	gender: {
		type: String,
		required: true,
		uppercase: true,
		'enum': ['M', 'F']
	},
	birthday: {
		type: Date,
		validate: [validate_18_years_old_or_more, 'You must be 18 years old or more']
	},
	twitter: {
		type: String,
		sparse: true,
		validate: [twitterHandleExists, 'Please provide a valid twitter handle'],
		//using modifier before storing the twitter handle
		set: filterTwitterHandle,
		//using modifier before using the twitter handle
		get: filterTwitterHandle
	},
	meta: {
		created_at: {
			type: Date,
			'default': Date.now,
			set: function(val) {
				return undefined;
			}
		},
		updated_at: {
			type: Date,
			'default': Date.now
		}
	}
});

/*
 * Virtual attribute available inside the code
 * the url to the twitter account is automatically set during the loading of the data
 * virtual attributes AREN'T stored inside the document
 */

UserSchema
	.virtual('twitter_url')
	.get(function() {
		if (this.twitter) {
			return 'http://twitter.com/' + encodeURIComponent(this.twitter);
		}
	});
UserSchema
	.virtual('full_name')
	.get(function() {
		if (typeof this.name === 'string') {
			return this.name;
		}
		return [this.name.first, this.name.last].join(' ');
	})
	.set(function(fullName) {
		var nameComponents = fullName.split(' ');
		this.name = {
			last: nameComponents.pop(),
			first: nameComponents.join(' ')
		}

	});
UserSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.created_at = undefined;
	}
	this.meta.updated_at = undefined;
	next();
});
/*
 * This creates an index that combines the values of username and meta.created_at, where the username is indexed in ascending order and the meta.created_at values are indexed in descending order.
 */
UserSchema.index({
	username: 1,
	'meta.created_at': -1
});

UserSchema.methods.recentArticles = function(callback) {
	return this.model('Article')
		.find({
			author: this._id
		})
		.sort({created_at: 1})
		.limit(5)
		.exec(callback);
};


module.exports = UserSchema;