const express = require('express'),
	  router = express.Router(),
	  bodyParser = require('body-parser'),
	  article = require('../models/article').article
	  admin = require('../models/admin').admin;

// HELPERS

// MIDDLEWARE
var check_auth = require('../middlewares/index').check_auth;
router.use( check_auth );
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	router.get('/ping-server', function (req, res) {
		res.status(200).json({message: 'pong'});
	});

	router.post('/create-article', function (req, res) {
		let article_detail = {
			author: 'Anonymous',
			category: req.body.category,
			url: req.body.url,
			content: {
				title: req.body.title
			}
		}

		return admin.get_auth_detail_from_xtoken( req.headers['x-auth-token'] )
			.then( user_details => {
				article_detail.author = user_details.name; 
				return new article(article_detail).save();
			})
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
				console.log( error );
				res.status(401).json(error);
			});
	});

	router.post('/switch-highlight', function (req, res) {
		let id = req.body.id;
		
		article.get_article_from_id( id )
			.then( article_detail => {
				if(article_detail.highlight){
					article_detail.highlight = !article_detail.highlight;
				}else{
					article_detail.highlight = true;
				}
				return article.update_highlight( id, article_detail.highlight )
			})
			.then( is_highlight_updated => {
				res.status(200).json( {message: 'Highlight updated'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json(error);
			});
	});

	router.post('/get-article-detail-from-id', function (req, res) {
		article.get_article_from_id( req.body.id )
			.then( article_details => {
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

	router.post('/post-short-content', function (req, res) {
		article.post_short_content( req.body.id, req.body.short_content )
			.then( is_content_posted => {
				res.status(200).json( {message: 'content updated'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/post-tags', function (req, res) {
		article.post_tags( req.body.id, req.body.tags )
			.then( is_tag_posted => {
				res.status(200).json( {message: 'tags updated'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/post-header-by', function (req, res) {
		console.log(req.body.header_by);
		article.post_header_by( req.body.id, req.body.header_by_markdown, req.body.header_by_html )
			.then( is_tag_posted => {
				res.status(200).json( {message: 'Photo by updated'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/post-url', function (req, res) {
		console.log(req.body.url);
		article.check_url( req.body.url )
			.then( id_url_available => {
				return article.post_url( req.body.id, req.body.url );
			})
			.then( is_url_posted => {
				res.status(200).json( {message: 'Url posted'} );
			})
			.catch( error => {
				console.log( error );
				res.status(401).json( error );
			})
	});

	router.post('/delete-article', function (req, res) {
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

module.exports = {
	"admin" : router
};