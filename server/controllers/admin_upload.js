const express = require('express'),
	  router = express.Router(),
	  multer = require('multer'),
	  uploador = multer({ dest: './uploads/' })
	  article = require('../models/article').article;

// HELPERS
const token_manager = require('../helpers/token_manager');

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );


	router.post('/upload-header', function (req, res, next) {
		// https://medium.com/technoetics/handling-file-upload-in-nodejs-7a4bb9f09a27
		// https://scotch.io/tutorials/express-file-uploads-with-multer
		// https://www.npmjs.com/package/express-fileupload
		let storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, './uploads/')
			},
			filename: function (req, file, cb) {
				token_manager.create_token( function (err, raw) {
					cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
				});
			}
		});

		var upload = storage.single('header_photo');

		upload(req, res, function (err) {
			if (err) {
			  console.log(err);
			  return res.status(422).send("an Error occured");
			  return
			}

			console.log(req.file);
			let path = req.file.path;
			return res.send("Upload Completed for " + path);
		})
	});

module.exports = {
	"admin_upload" : router
};