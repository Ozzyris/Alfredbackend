const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser'),
	  article = require('../models/article').article;

// HELPERS

// MIDDLEWARE
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/get-all-articles', function (req, res) {
		article.get_all_public_articles()
			.then( all_articles => {
				res.status(200).json( all_articles );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.get('/get-all-articles', function (req, res) {
		article.get_all_public_articles()
			.then( all_articles => {
				res.status(200).json( all_articles );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.get('/get-highlighted-articles', function (req, res) {
		article.get_public_highlighted_articles()
			.then( highlighted_articles => {
				res.status(200).json( highlighted_articles );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.get('/get-article-details/:id', function (req, res) {
		article.get_public_article_from_id( req.params.id )
			.then( articles_details => {
				res.status(200).json( articles_details );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.get('/get-last-15-articles', function (req, res) {
		article.get_public_last_15_articles()
			.then( last_article => {
				res.status(200).json( last_article );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

module.exports = {
	"public" : router
};