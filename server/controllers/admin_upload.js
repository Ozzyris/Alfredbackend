const express = require('express'),
	  router = express.Router(),
	  multer = require('multer'),
	  multerS3 = require('multer-s3'),
	  aws = require('aws-sdk'),
	  config = require('../config'),    
	  mime = require('mime'),
	  article = require('../models/article').article;

// HELPERS
const token_manager = require('../helpers/token_manager');

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );

//AWS
// aws.config.loadFromPath('./s3_config.json');
var s3 = new aws.S3({
   accessKeyId: config.aws_access_key_id,
   secretAccessKey: config.aws_secret_access_key,
   Bucket: config.bucket,
 });

router.post('/upload-header/:id', function (req, res, next) {
	console.log(req.params.id);
	var item = req.body;
	console.log(item);
	var upload = multer({
	    storage: multerS3({
	        s3: s3,
	        bucket: config.bucket,
	        metadata: function (req, file, cb) {
	            cb(null, { fieldName: file.fieldname });
	        },
	        key: function (req, file, cb) {
	            cb(null, Date.now().toString())
	        }
	    })
	})
});

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