/*
defi ning a simple article schema that contains an author fi eld that is of type Schema
.ObjectId and references the model named User
*/
var Schema = require('mongoose').Schema;
var ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true
	},
	body: String,
	author: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	created_at: {
		type: Date,
		'default': Date.now
	}
});

/*
 provide a search function that returns articles with that string on the
 title or on the body.
 */
ArticleSchema.statics.search = function(str, callback) {
    var regexp = new RegExp(str, 'i');
    return this.find({'$or': [{title: regexp}, {body: regexp}]}, callback);
};
module.exports = ArticleSchema;