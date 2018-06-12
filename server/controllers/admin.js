const express = require('express'),
	  router = express.Router(),
	  article = require('../models/article').article;

// HELPERS

// MIDDLEWARE
var check_auth = require('../middlewares/index').check_auth;

router.use( check_auth );

	router.post('/create-article', function (req, res) {
		let article_detail = {
			author: 'Alexandre Nicol',
			category: req.body.category,
			content: {
				title: req.body.title
			}
		}

		return new article(article_detail).save()
			.then( article_id => {
				res.status(200).json( {message: 'Article created'} );
			})
			.catch( error => {
				console.log(error);
				res.status(401).json(error);
			});
	});

	router.get('/get-articles', function (req, res) {
		article.get_all_articles()
			.then( all_articles => {
				console.log( all_articles );
				res.status(200).json( all_articles );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/switch-status', function (req, res) {
		let id = req.body.id;
		
		article.get_article_from_id( id )
			.then( article_detail => {
				article_detail.status = !article_detail.status;
				return article.update_status( id, article_detail.status )
			})
			.then( is_status_updated => {
				res.status(200).json( {message: 'Status updated'} );
			})
			.catch( error => {
				res.status(401).json(error);
			});
	});

module.exports = {
	"admin" : router
};