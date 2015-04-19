var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileSystem = require('fs');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');


//https://thinkster.io/mean-stack-tutorial/
mongoose.connect('mongodb://admin:password@ds061288.mongolab.com:61288/cs3212-shaffer', function (err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

//load all files

fileSystem.readdirSync(__dirname + '/model').forEach(function(fileName) {
    require(__dirname + '/model/' + fileName);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/javascripts/angular'));
app.use(express.static(__dirname + '/public/javascripts/summernote'));
app.use(express.static(__dirname + '/public/javascripts/popover'));
app.use(express.static(__dirname + '/public/htmls'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/model'));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
