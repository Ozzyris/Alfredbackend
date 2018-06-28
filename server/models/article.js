var mongoose = require("./mongoose"),
    moment = require('moment'),
    Promise = require('bluebird');

var article = new mongoose.Schema({
    author: {type: String},
    creation_date: {type: Date, default: moment()},
    edit_date: {type: Date},
    status: {type: Boolean, default: false},
    highlight: {type: Boolean, default: false},
    content: {
        header: {type: String, default: 'https://images.unsplash.com/photo-1528610401968-7f1d38ab592a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4767b7c6c7e96d7f837c017cbacdf6db&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'},
        header_by_markdown: {type: String, default: ''},
        header_by_html: {type: String, default: '<p><a href=\"https://unsplash.com/@ozmlcn\" target=\"_blank\">@Ozmlcn</a> from Unsplash</p>'},
        title: {type: String},
        short_content: {type: String, default: 'As for most of the countries Australian public Holiday are based around History, Religion and Wars.'},
        content_markdown: {type: String},
        content_html: {type: String}
    },
    category: {type: String},
    tags: {type: String, default: "[\"Add a tag\"]"}
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
article.statics.get_all_public_articles = function(){
    return new Promise((resolve, reject) => {
        this.find({status : true}, {'content.title':1, 'content.header':1, 'edit_date':1, 'category':1, 'tags':1, '_id':1}).exec()
            .then(articles => {
                if( articles ){
                    resolve( articles );
                }else{
                    reject({ message: 'an error happend', code: 'email_duplicate'});
                }
            })
    })
};
article.statics.get_public_highlighted_articles = function(){
    return new Promise((resolve, reject) => {
        this.find({ status : true, highlight: true}, {'content.title':1, '_id':1}).exec()
            .then(articles => {
                if( articles ){
                    resolve( articles );
                }else{
                    reject({ message: 'an error happend', code: 'email_duplicate'});
                }
            })
    })
};

article.statics.get_public_last_15_articles = function(){
    return new Promise((resolve, reject) => {
        this.find({ status : true }, {'content.title':1, 'content.header':1, 'content.short_content':1, 'edit_date':1, '_id':1}).sort({'creation_date': -1}).limit(15).exec()
            .then(articles => {
                if( articles ){
                    resolve( articles );
                }else{
                    reject({ message: 'an error happend', code: 'email_duplicate'});
                }
            })
    })
};

article.statics.get_public_article_from_id = function( id ){
    return new Promise((resolve, reject) => {
         this.findOne({ status : true, _id : id }).exec()
            .then( article => {
                if( article ){
                    resolve( article );
                }else{
                    reject({ message: 'Your id does not exist', code: 'id_not_exist'});
                }
            })
    })
};
article.statics.get_article_from_id = function( id ){
    return new Promise((resolve, reject) => {
         this.findOne({ _id : id }).exec()
            .then( article => {
                if( article ){
                    resolve( article );
                }else{
                    reject({ message: 'Your id does not exist', code: 'id_not_exist'});
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

article.statics.update_highlight = function( id, highlight ){
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'highlight': highlight
        }).exec()
        .then(highlight =>{
            resolve(true);
        })
    })
};

article.statics.post_article_content = function( id, markdown, html ){
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'edit_date': moment(),
            'content.content_markdown': markdown,
            'content.content_html': html
        }).exec()
        .then(status =>{
            resolve(true);
        })
    })
};

article.statics.post_short_content = function( id, short_content ){
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'edit_date': moment(),
            'content.short_content': short_content,
        }).exec()
        .then(status =>{
            resolve(true);
        })
    })
};

article.statics.post_header_by = function( id, header_by_markdown, header_by_html ){
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'edit_date': moment(),
            'content.header_by_markdown': header_by_markdown,
            'content.header_by_html': header_by_html,
        }).exec()
        .then(status =>{
            resolve(true);
        })
    })
};

article.statics.post_tags = function( id, tags ){
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'edit_date': moment(),
            'tags': tags
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
            'content.title': title
        }).exec()
        .then(status =>{
            resolve(true);
        })
    })
};


article.statics.update_header = function( id, header ){
    console.log( id, header );
    return new Promise((resolve, reject) => {
        article.update({ '_id' : id }, {
            'edit_date': moment(),
            'content.header': header
        }).exec()
        .then(status =>{
            resolve(true);
        })
    })
};

article.statics.delete_article = function( id ){
    return new Promise((resolve, reject) => {
        article.findByIdAndRemove({ '_id' : id }).exec()
            .then(session =>{
                resolve(true);
            })
    })
};

var article = mongoose.DB.model('article', article);

module.exports.article = article