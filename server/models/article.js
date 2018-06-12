var mongoose = require("./mongoose"),
    moment = require('moment'),
    Promise = require('bluebird');

var article = new mongoose.Schema({
    author: {type: String},
    creation_date: {type: Date, default: moment()},
    edit_date: {type: Date},
    status: {type: Boolean, default: false},
    content: {
        header: {type: String},
        title: {type: String},
        content_markdown: {type: String},
        content_html: {type: String}
    },
    category: {type: String},
    tags: []
}, {collection: 'article'});

//COMMON
article.statics.get_all_articles = function(){
    return new Promise((resolve, reject) => {
        this.find({}, {'status':1, 'content.title':1, 'category':1, 'tags':1, '_id':1}).exec()
            .then(articles => {
                if( articles ){
                    resolve( articles );
                }else{
                    reject({ message: 'an error happend', code: 'email_duplicate'});
                }
            })
    })
};

//SWITCH STATUS
article.statics.get_article_from_id = function( id ){
    return new Promise((resolve, reject) => {
         this.findOne({ _id : id }).exec()
            .then( article => {
                if( article ){
                    resolve( article );
                }else{
                    reject({ message: 'Your is does not exist', code: 'is_not_exist'});
                }
            })
    })
};
article.statics.update_status = function( id, status ){
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'status': status
        }).exec()
        .then(status =>{
            resolve(true);
        })
    })
};

article.statics.post_article_title = function( id, title ){
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'edit_date': moment(),
            'content.title': title,
        }).exec()
        .then(status =>{
            resolve(true);
        })
    })
};

article.statics.delete_article = function( id, markdown, html ){
    return new Promise((resolve, reject) => {
        article.findByIdAndRemove({ '_id' : id }).exec()
            .then(session =>{
                resolve(true);
            })
    })
};

var article = mongoose.DB.model('article', article);

module.exports.article = article