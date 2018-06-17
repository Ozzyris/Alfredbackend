const express = require('express'),
	  app = express(),
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

	router.post('/get-article-detail-from-id', function (req, res) {
		article.get_article_from_id( req.body.id )
			.then( article_details => {
				console.log( article_details );
				res.status(200).json( article_details );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/post-article-title', function (req, res) {
		article.post_article_title( req.body.id, req.body.title )
			.then( is_title_posted => {
				res.status(200).json( {message: 'title updated'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/post-article-content', function (req, res) {
		article.post_article_content( req.body.id, req.body.markdown, req.body.html )
			.then( is_content_posted => {
				res.status(200).json( {message: 'content updated'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/delete-article', function (req, res) {
		console.log(req.body)
		article.delete_article( req.body.id )
			.then( is_content_delete => {
				console.log(is_content_delete);
				res.status(200).json( {message: 'content deleted'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/upload-header', function (req, res) {
		// https://medium.com/technoetics/handling-file-upload-in-nodejs-7a4bb9f09a27
		// https://scotch.io/tutorials/express-file-uploads-with-multer
		// https://www.npmjs.com/package/express-fileupload

		// var DIR = './uploads/';
		// var upload = multer({dest: DIR}).single('photo');

		console.log( "req ", req.files );
		// upload(req, res, function (err) {
		// 	if (err) {
		// 		console.log(err);
		// 		return res.status(422).send("an Error occured")
		// 	}
		// 	path = req.file.path;
		// 	return res.send("Upload Completed for "+path);
		// })
	});

module.exports = {
	"admin" : router
};