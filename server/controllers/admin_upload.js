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
			cb(null, 'article-header-' + req.params.id + '.' + mime.extension(file.mimetype))
		}
	});
var permanent_upload = multer({ storage: permanent_storage });


	router.post('/upload-header/:id', function (req, res, next) {
		//https://www.npmjs.com/package/multer-s3

		var upload = permanent_upload.single('header_photo');

		upload(req, res, function (err) {
			if (err || req.file == undefined) {
			  console.log(err);
			  return res.status(422).send("an Error occured");
			}
			let path = req.protocol + '://' + req.get('host') + '/uploads/article-header-' + req.params.id + '.' + mime.extension(req.file.mimetype);
			article.update_header( req.params.id, path )
				.then( is_header_updated => {
					res.status(200).json( {message: 'Header picture updated'} );
				})
				.catch( error => {
					res.status(401).json(error);
				});
		})
	});

module.exports = {
	"admin_upload" : router
};