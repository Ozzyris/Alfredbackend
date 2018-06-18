const express = require('express'),
	  router = express.Router(),
	  multer = require('multer'),
	  uploador = multer({ dest: './uploads/' })
	  article = require('../models/article').article;

// HELPERS

// MIDDLEWARE
router.use( require('../middlewares/index').check_auth );


	router.post('/upload-header', function (req, res, next) {
		// https://medium.com/technoetics/handling-file-upload-in-nodejs-7a4bb9f09a27
		// https://scotch.io/tutorials/express-file-uploads-with-multer
		// https://www.npmjs.com/package/express-fileupload
		var upload = uploador.single('header_photo');

		upload(req, res, function (err) {
			if (err) {
			  console.log(err);
			  return
			}

			console.log(req);
			console.log(req.file.path);
		})

		
		
		// var DIR = './uploads/';
		// var upload = multer({dest: DIR}).single('header_photo');

		
		// upload(req, res, function (err) {
		// 	if (err) {
		// 		console.log(err);
		// 		return res.status(422).send("an Error occured")
		// 	}
		// 	console.log( "req ", req.file );
		// 	path = req.file.path;
		// 	return res.send("Upload Completed for "+path);
		// })
	});

module.exports = {
	"admin_upload" : router
};