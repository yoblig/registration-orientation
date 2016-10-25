// Require
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require("helmet");
var compression = require("compression");
var methodOverride = require("method-override");
var ejs = require("ejs");
var email = require("emailjs");
var nodemailer = require("nodemailer");


// Database
// Models & Schema
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
   firstName: String, 
   lastName: String,
   email: String,
   orientationId: String
});
var Student = mongoose.model('Student', StudentSchema);

var OrientationSchema = new Schema({
    date: [Date],
    time: [Date],
    totalStudents: Number
});
var Orientation = mongoose.model('Orientation', OrientationSchema);

var StudentTypeSchema = new Schema({
    type: String     
});
var StudentType = mongoose.model('StudentType', StudentTypeSchema);
// var StudentType = mongoose.model('StudentType', StudentTypeSchema, 'studenttype');

// End Models & Schema

// Database Connection
mongoose.connect('mongodb://localhost/registration');
// mongoose.connect('mongodb://registration-orientation-yoblig.c9users.io:27017/registration');
// using c9 mongo
// Mongo Kill Instructions: killall -15 mongod 

// Express Config
    // Construct Express
    var app = express();
    
    // view engine
    app.set('view-engine', 'ejs');
    
    // public 
    app.use(express.static(__dirname + 'public'));
    
    
    // Middleware
    // logger/morgan - log the requests details
    app.use(logger('dev'));
    
    // body-parser - body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body 
    app.use(bodyParser.json());
    
    // body-parser urlencoded -  accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings
    app.use(bodyParser.urlencoded({ extended: false }));
    
    // cookie parser - parses Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    
    // set the public folder accessible for resources
    app.use(express.static(path.join(__dirname, 'public')));
    
    // helmet -  secure your Express apps by setting various HTTP headers
    app.use(helmet());
    
    // compresssion - compressing code via deflate or gzip
    app.use(compression());
    
    // method-override -Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    app.use(methodOverride());
    
    // Error


// Routes
    // Student
    app.get('/', function(req, res, next){
        ejs.renderFile('./views/index.ejs', {title:'Registration Orientation'}, {}, function(err, str){
            if(err) res.send(err);
            else res.send(str);
        });
    });
    app.get('/payment', function(req, res, next){
        ejs.renderFile('./views/payment.ejs', {title:'Registration Orientation'}, {}, function(err, str){
            if(err) res.send(err);
            else res.send(str);
        });
    });
    app.post('/confirm', function(req, res, next){
        ejs.renderFile('./views/confirm.ejs', {title:'Registration Orientation'}, {}, function(err, str){
            if(err) res.send(err);
            else res.send(str);
            // get money
        });
    });
    // Admin
    app.get('/dashboard', function(req, res, next){
        ejs.renderFile('./views/dashboard.ejs', {title:'Registration Orientation'}, {}, function(err, str){
            if(err) res.send(err);
            else res.send(str);
        });
    });
    app.get('/student-type', function(req, res, next){
        ejs.renderFile('./views/student-type.ejs', {title:'Registration Orientation'}, {}, function(err, str){
            if(err) res.send(err);
            else res.send(str);
        });
    });
    app.post('/student-type', function(req, res, next){
        var studentType = req.body.studentType;
        console.log(studentType);
        var typeStudent = new StudentType({
            type: studentType
        });
        
        
        typeStudent.save(function (err, data) {
            if (err) console.log(err);
            else {
            console.log('Saved ', data );
            res.redirect('/dashboard');   
          }
        });
    });
    app.get('/email', function(req, res, next){
        ejs.renderFile('./views/email.ejs', {title:'Registration Orientation'}, {}, function(err, str){
            if(err) res.send(err);
            else res.send(str);
        });
    });
    app.get('/sessions', function(req, res, next){
        ejs.renderFile('./views/sessions.ejs', {title:'Registration Orientation'}, {}, function(err, str){
            if(err) res.send(err);
            else res.send(str);
        });
    });

app.listen(8080, function() {
    console.log('Server running on 8080');
})