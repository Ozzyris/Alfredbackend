const express = require('express'),
	  router = express.Router(),
	  moment = require('moment'),
	  admin = require('../models/admin').admin,
	  bodyParser = require('body-parser'),
	  config = require('../config');

// HELPERS
const bcrypt = require('../helpers/bcrypt'),
	  token_manager = require('../helpers/token_manager');

// MIDDLEWARE
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

	// SIGN UP
	router.put('/signup-with-credentials', function (req, res) {
		let user = {
			email: '',
			password: '',
		};

		admin.check_email( user.email )
			.then( is_email_unique => {
				if( is_email_unique ){
					return bcrypt.hash_password( user.password );
				}else{
					throw { message: 'Your email already exist', code: 'email_duplicate'};
				}
			})
			.then( hash_password => {
				user.password = hash_password;
				return new admin(user).save();
			})
			.then( is_user_creater => {
				res.status(200).json('User created');
			})
			.catch( error => {
				res.status(401).json( error );
			})
	});

	// SIGN IN
	router.post('/signin-with-credentials', function (req, res) {
		let user = {
			email: req.body.email,
			password: req.body.password,
			stay_loggedin : req.body.stay_loggedin
		},
		session = {
			token: '',
			expiration_date: '',
			keep_session: req.body.stay_loggedin
		};

		admin.get_password_from_email( user.email )
			.then( db_password => {
				return bcrypt.compare_password( user.password, db_password );
			})
			.then(are_password_similar => {
				if(are_password_similar){
					return admin.get_user_id_from_email( user.email );
				}else{
					throw {message: 'Your email or passowrd was invalid', code: 'wrong_password'};
				}
			})
			.then(user_id => {
				session.token = token_manager.create_token();

				if( user.stay_loggedin ){
					session.expiration_date = moment().add(7,'day');
				}else{
					session.expiration_date = moment().add(1,'day');
				}
				return admin.save_session_detail_from_id( session, user_id );
			})
			.then(is_session_saved => {
				res.status(200).json({ session: session.token });
			})
			.catch( error => {
				res.status(401).json( error );
			});
	});

module.exports = {
	"admin_auth" : router
};