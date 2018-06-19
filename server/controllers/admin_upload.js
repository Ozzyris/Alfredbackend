const express = require('express'),
	  router = express.Router(),
	  multer = require('multer'),
	  mime = require('mime'),
	  article = require('../models/article').article;

// HELPERS
const token_manager = require('../helpers/token_manager');

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );

// MULTER
var permanent_storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './uploads/')
		},
		filename: function (req, file, cb) {
			cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
		}
	});
var permanent_upload = multer({ storage: permanent_storage });


	router.post('/upload-header', function (req, res) {
		var upload = permanent_upload.single('header_photo');

		upload(req, res, function (err) {
			if (err || req.file == undefined) {
			  console.log(err);
			  return res.status(422).send("an Error occured");
			}
			console.log(req.file)
			// let path = req.file.fieldname + '-' + Date.now() + '.' + mime.extension(req.file.mimetype);
			// article.get_article_from_id( id )
			// 	.then( article_detail => {
			// 		article_detail.status = !article_detail.status;
			// 		return article.update_status( id, article_detail.status )
			// 	})
			// 	.then( is_status_updated => {
					res.status(200).json( {message: 'Header picture updated'} );
			// 	})
			// 	.catch( error => {
			// 		console.log( error );
			// 		res.status(401).json(error);
			// 	});
		})
	});

module.exports = {
	"admin_upload" : router
};