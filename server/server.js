// PACKAGES
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    config = require('./config'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

// ROUTES
const admin_auth = require('./controllers/admin_auth').admin_auth,
      admin = require('./controllers/admin').admin,
      public = require('./controllers/public').public;

// HELPERS

server.listen(config.port);

// app.use(bodyParser.json({limit: '5mb'}));
// app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token");
    if ('OPTIONS' == req.method){
        res.sendStatus(200);
    }else{
        next();
    }
});

// MORGAN LOGGING THE CALLS
app.use(morgan('dev'));

// ROUTES
app.use('/admin-auth', admin_auth);
app.use('/admin', admin);
app.use('/public', public);