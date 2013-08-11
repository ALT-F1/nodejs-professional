var Article = require('../../data/models/article');

function loadArticle(req, res, next) {
	Article.findOne({
		title: req.params.title
	})
		.populate('author')
		.exec(function(err, article) {
			if (err) {
				return next(err);
			}
			if (!article) {
				return res.send('Not found', 404);
			}
			req.article = article;
			next();
		});
}
module.exports = loadArticle;