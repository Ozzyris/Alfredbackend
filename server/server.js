// PACKAGES
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    config = require('./config'),
    morgan = require('morgan');

// ROUTES
const admin_auth = require('./controllers/admin_auth').admin_auth,
      admin = require('./controllers/admin').admin,
      public = require('./controllers/public').public;

// HELPERS

server.listen(config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
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