var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');
var employeeDao = require('../dao/employeeDao')
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('updateUser');
});*/

// 路由中间件-------------------------------------------------------------------------------------------------------------
// 判断是否有某个功能的权限
router.use(/.*limit$/,function (req,res,next) {
    console.log('路由中间件--------------------------------Request URL:', req.originalUrl);
    console.log(req.query.username+ "-------------------");
    if(req.query.username==5){
        next();
    }else{
        res.render('sucmiddle');
    }},function (req,res,next) {
    console.log('路由中间件--------------------------------Requst Type:',req.method);
    next();
});

//----------------------------------------------------------------------------------------------------------------------

// 登录验证，判断登录的信息：用户名和密码
// 如果正确将信息存在session中
// 如果错误，返回到登录页面
/*router.post('/login',function (req,res,next) {
    function matchLogin(username,password) {
        var user = {"username":username};
        if(req.body.username==username&&req.body.password==password){
            req.session.user = user;
            console.log(req.session.user);
            user = {"status":0}  //用户名密码正确
            res.json(user);
        }else if(req.body.username!=username){
            console.log(req.body.username!=username);
            console.log("--------------------------------用户名");
            user= {"status":1};  //用户名不存在
            res.json(user);
        }else{
            user= {"status":2};      //密码错误
            res.json(user);
        }
    }
    userDao.queryName_Pass(req,res,next,matchLogin);
});*/
router.post('/login',function (req,res,next) {
    let user_front = req.body.username;  //从前台接收的用户名
    let pass_front = req.body.password; //从前台接收的密码

    console.log(user_front);
    console.log(pass_front);

    function matchLogin(username,password) {
        if(req.body.username==username&&req.body.password==password){
            console.log("--------------------------------用户名密码正确");
            var user = {"username":username};
            req.session.user = user;
            console.log(req.session.user);
            user = {"status":0};  //用户名密码正确
            res.json(user);
        }else {
            function matchUsername(username,password) {
                console.log("-----------------------------------------------------");
                if(username != user_front){
                    user = {"status":"1"};  //用户名为空
                    res.json(user);
                    //res.render('suc');
                }
                else if(password != pass_front){
                    console.log("密码错误");
                    user = {"status":"2"};
                    res.json(user);
                    //res.render('fail');
                }
            }
            var userDao = require('../dao/userDao');
            userDao.login_correct(req,res,next,matchUsername);
        }
    }

    userDao.queryName_Pass(req,res,next,matchLogin);
});
//----------------------------------------------------------------------------------------------------------------------


//登陆跳到表单页
router.get('/login',function (req,res,next) {
    res.render("updateUser");
});
//----------------------------------------------------------------------------------------------------------------------

//登录信息的判断，用户名和密码，此路由可以不用了
router.get('/login_correct',function (req,res,next) {
    userDao.login_correct(req, res, next);
});



// 注册用户
//TODO 同时支持get,post
router.post('/registerUser', function(req, res, next) {
    console.log("register--------------------------");
    function nextMyself(isEmpty, userDao){
        console.log("register--------------------------" + isEmpty);
        if (isEmpty){
            console.log(req.body.username + "-------------------------------------register");
            if(!req.body.password){
                res.json({"status":"2"}); //密码为空
            }else{
                userDao.add(req, res, next);
                employeeDao.add(req,res,next);
            }
           // res.render("suc");
        }
        else {
            res.json({"status":"1"});//用户已存在
        }
    }
    userDao.queryById(req, res, next, nextMyself);
});

router.post('/register_judgeUsername',function (req,res,next) {
    userDao.register_judgeUsername(req,res,next);
});

//查询所有user
router.get('/queryAll', function(req, res, next) {
    console.log('查询所有user');
    console.log(req.session.user);
    console.log('查询所有user');
    userDao.queryAll(req, res, next);
});

router.get('/querylimit', function(req, res, next) {
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

