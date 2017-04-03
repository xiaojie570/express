var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var employee = require('./routes/employee');
//var node_dev = require('node-dev');

var app = express();

//session
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 输出日志到目录
var fs = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a',  encoding:'utf8'}); // 记得要先把目录建好，不然会报错
app.use(logger('combined', {stream: accessLogStream}));

/*
app.use(function(req,res,next){
  console.log('Time:',Date.now());
  next();
});
*/



//session 处理     43--67行
app.use(cookieParser());
app.use(session({
    secret:'1',
    name:'testapp',
    resave: false,
    saveUninitialized:true,
    cookie: {maxAge: 8000000000 },
}));

app.use(function (req,res,next){
    console.log("sesion++++++++++++++++++++++++++");
    console.log(req.session.user);
    console.log("------------------------" + !req.session.user);
    console.log(req.body.username);
    if(req.body.username==null) {
        console.log(req.url == '/users/registerUser/');

        if (req.url == '/users/login') {
            console.log(req.url == '/users/login');
            res.render("updateUser");//如果请求的地址是登陆通过，进行下一个请求
        } else if (req.url == '/users/registerUser'||req.url == '/users/register_judgeUsername') {
            if (req.body.username != null) {
                console.log(req.url == '/users/registerUser');
            } else {
                res.redirect('/users/registerUser');
                //res.render("register");
            }
        } else if (!req.session.user) {
            res.redirect('/users/login');
        } else {
            next();
        }
    }else {
        if(req.url == '/users/register_judgeUsername')
        {
            next();
        }

    }
});
//session 处理



app.use('/index', routes);
app.use('/users', users); // 自定义路径
app.use('/employee', employee);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found!!!!!!!!!!');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
