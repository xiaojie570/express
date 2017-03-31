var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

    res.render('updateUser');
});*/

//路由中间件------------------------------------------------------
router.use('/query/',function (req,res,next) {
    console.log('路由中间件--------------------------------Request URL:', req.originalUrl);
    next('route');
},function (req,res,next) {
    console.log('路由中间件--------------------------------Requst Type:',req.method);
    next();
});

router.use('/queryAll/',function (req,res,next) {
    console.log('路由中间件--------------------------------Request URL:', req.originalUrl);
    next('route');
},function (req,res,next) {
    console.log('路由中间件--------------------------------Requst Type:',req.method);
    next();
});

//----------------------------------------------------------------
router.post('/login',function (req,res) {
    if(req.body.id=="12"&&req.body.password=="1"){
        var user = {"id":"12"};
        req.session.user = user;
        console.log(req.session.user);
        res.render('suc');
    }else{
        res.redirect('/users/login');
    }
});

router.get('/login',function (req,res) {
    res.render("updateUser");
});


/*router.post('/login',function (req,res) {
    function login_Correct(db_uid,db_upassword) {
        if (req.body.uid == db_uid && req.body.upassword == db_upassword) {
            var user = {"uid": "12"};
            req.session.user = user;
            console.log(req.session.user);
            res.render('suc');
        } else {

            res.redirect('/users/login');
        }
    }
});*/


router.get('/login_correct',function (req,res,next) {
    /*function nextmethod(db_uid, db_upassword){
        console.log(db_uid);
        console.log("correcttttttttttttttt");
        console.log(db_upassword);
    }*/
    userDao.login_correct(req, res, next);
});

// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
    function nextMyself(isEmpty, userDao){
        if (isEmpty){
            userDao.add(req, res, next);
        }
        else {
            res.json({"status":"用户已存在"});
        }
    }
    userDao.queryById(req, res, next, nextMyself);
});


router.get('/queryAll', function(req, res, next) {
    console.log('查询所有user');
    userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    console.log('按照ID查询user');
    userDao.queryOne(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
    console.log('按照ID删除user');
    userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next){
    console.log('按照ID更新user');
    console.log(req.params);
    userDao.update(req, res, next);
});

module.exports = router;

