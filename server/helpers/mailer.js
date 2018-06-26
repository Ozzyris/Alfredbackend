var nodemailer = require('nodemailer'),
    Promise = require('bluebird'),
    fs = require('fs'),
    config = require('../config');

var transporter = nodemailer.createTransport( config.email_params );

function build_email_feedback(url, feedback){
	return new Promise((resolve, reject)=>{
		fs.readFile('templates/emails/email_feedback.html', 'utf8', (err, html) => {
			html = html.replace('{{feedback}}', feedback);
			html = html.replace('{{verfiy_email_link}}', config.front_end_url + url);
			resolve( html );
		});
	});
}

function send_email( subject, body ){
	return new Promise((resolve, reject)=>{
		//Mail Param
		let mailOptions = {
			from: '"Expat-manual 🔥" <noreply@expat-manual.com>',
			to: 'nemokervi@yahoo.fr',
			subject: subject,
			html: body
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if( error ){
				reject( error );
			}else{
				console.log(info);
				resolve( info );
			}
		});
	});
}

module.exports={
    'build_email_feedback': build_email_feedback,
    'send_email': send_email,
}