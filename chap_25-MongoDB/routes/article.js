/*
 * Article Routes
 */
var async = require('async');
var Article = require('../data/models/article');
var loadArticle = require('./middleware/load_article');
var loggedIn = require('./middleware/logged_in');

var maxArticlesPerPage = 3;

module.exports = function(app) {
	app.get('/articles', function(req, res, next) {
		var page = req.query.page && parseInt(req.query.page, 10) || 0;
		async.parallel([
				function(next) {
					Article.count(next);
				},
				function(next) {
					Article.find({})
						.sort({title: 1})
						.skip(page * maxArticlesPerPage)
						.limit(maxArticlesPerPage)
						.exec(next);
				}
			],
			// final callback

			function(err, results) {
				if (err) {
					return next(err);
				}
				var count = results[0];
				var articles = results[1];
				var lastPage = (page + 1) * maxArticlesPerPage >= count;
				res.render('articles/index', {
					title: 'Articles',
					articles: articles,
					page: page,
					lastPage: lastPage
				});
			}
		);
	});
	app.get('/articles/new', loggedIn, function(req, res) {
		res.render('Articles/new', {
			title: "New Article"
		});
	});
    app.get('/articles/search', function(req, res, next) {
        console.log('searching for', req.query.q);
        Article.search(req.query.q, function(err, articles) {
            if (err) {
                return next(err);
            }
            res.render('articles/index', {
                title: 'Article search results',
                articles: articles,
                page: 0,
                lastPage: true
            });
        });
    });
	app.get('/articles/:title', loadArticle, function(req, res /* , next*/) {
		res.render('articles/article', {
			title: req.article.title,
			article: req.article
		});
	});
	app.post('/articles', loggedIn, function(req, res, next) {
		var article = req.body;
		article.author = req.session.user._id;
		Article.create(article, function(err) {
			if (err) {
				if (err.code === 11000) {
					res.send('Conflict', 409);
				} else {
					if (err.name === 'ValidationError') {
						return res.send(Object.keys(err.errors).map(function(errField) {
							return err.errors[errField].message;
						}).join('. '), 406);
					} else {
						next(err);
					}
				}
				return;
			}
			res.redirect('/articles');
		});
	});
	app.del('/articles/:title', loggedIn, loadArticle, function(req, res, next) {
		req.article.remove(function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/articles');
		});
	});

};