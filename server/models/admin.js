var mongoose = require("./mongoose"),
    moment = require('moment'),
    Promise = require('bluebird');

var admin = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    auth_record: {
        active_auth: {
            creation_date: {type: String},
            last_modification_date: {type: String},
            expiration_date: {type: String},
            keep_session: {type: Boolean, default: false},
            token: {type: String}
        },
        recorded_auth: [
            {
                creation_date: {type: String},
                last_modification_date: {type: String},
                ending_date: {type: String},
                keep_session: {type: String},
            }
        ]
    }
}, {collection: 'admin'});


//COMMON
admin.statics.check_email = function(email){
    return new Promise((resolve, reject) => {
        this.findOne({ email : email }).exec()
            .then( user => {
                if( !user ){
                    resolve( true );
                }else{
                    reject({ message: 'Your email already exist', code: 'email_duplicate'});
                }
            })
    })
};
admin.statics.get_user_id_from_email = function(email){
    return new Promise((resolve, reject) => {
        this.findOne({ email : email }).exec()
            .then( user => {
                if( user ){
                    resolve( user._id );
                }else{
                    reject({ message: 'Your email does not exist', code: 'email_not_exist'});
                }
            })
    })
};

//MIDDLEWARE
admin.statics.get_auth_detail_from_xtoken = function( xtoken ){
    return new Promise((resolve, reject) => {
        this.findOne({ 'auth_record.active_auth.token': xtoken }).exec()
            .then( user => {
                if( user ){
                    let cleaned_token = {
                        level: user.level,
                        creation_date: user.auth_record.active_auth.creation_date,
                        last_modification_date: user.auth_record.active_auth.last_modification_date,
                        expiration_date: user.auth_record.active_auth.expiration_date,
                        token: user.auth_record.active_auth.token,
                        keep_session: user.auth_record.active_auth.keep_session,
                        device_details: user.auth_record.active_auth.device_details
                    }
                    resolve( cleaned_token );
                }else{
                    reject({ message: 'Your session does not exist', code: 'xtoken_not_exist'});
                }
            })
    });
}
admin.statics.update_token_timestamp_from_xtoken = function( xtoken, session ){
    return new Promise((resolve, reject) => {
        admin.update({ 'auth_record.active_auth.token': xtoken }, {
            'auth_record.active_auth.last_modification_date': moment(),
            'auth_record.active_auth.expiration_date': session.expiration_date,
        }).exec()
        .then(session =>{
            resolve(true);
        })
    });
}

//SIGNIN
admin.statics.get_password_from_email = function( email ){
    return new Promise((resolve, reject) => {
        this.findOne({ email : email }).exec()
            .then( user => {
                if( user ){
                    resolve( user.password )
                }else{
                    reject({ message: 'Your email does not exist', code: 'email_not_exist'});
                }
            })
    });
}
admin.statics.save_session_detail_from_id = function (session, user_id){
    return new Promise((resolve, reject) => {
        admin.update({ _id: user_id }, {
            auth_record: {
                active_auth: {
                    creation_date: moment(),
                    last_modification_date: moment(),
                    expiration_date: session.expiration_date,
                    token: session.token
                }
            }
        }).exec()
        .then(session =>{
            resolve(true);
        })
    });
}

var admin = mongoose.DB.model('admin', admin);

module.exports.admin = admin