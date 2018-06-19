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
			console.log(req.file);
			if (err || req.file == undefined) {
			  console.log(err);
			  return res.status(422).send("an Error occured");
			  return
			}

			let path = req.path;
			return res.send("Upload Completed for " + path);
		})
	});

module.exports = {
	"admin_upload" : router
};