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
admin.statics.check_email = function (email){
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
admin.statics.get_user_id_from_email = function (email){
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