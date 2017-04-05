/**
 * Created by fuxia on 2017/4/2.
 */
var express = require('express');
var router = express.Router();
var employeeDao =require('../dao/employeeDao');

/*router.post('/updateInfo_Staff',function (req,res,next) {
    function updateInfo(isExists,employeeDao) {
        if(isExists){
            employeeDao.updateByStaffid(req,res,next);
        }else{
            res.json({"status":"1"});//position不存在
        }
    }
    employeeDao.selectPosition(req,res,next);
});*/


//点击更新提交的时候（所有更新信息）要先判断职位是否存在
router.post('/updateStaffposition',function (req,res,next) {
     function updateInfo(isExists,employeeDao) {
          if(isExists){ //存在,存在可以插入
             employeeDao.updateByusername(req,res,next);
         }else{//不存在，不可以插入
             res.json({"status":"2"});//position不存在
         }
    }
    employeeDao.selectPosition(req,res,next,updateInfo);
 });

//通过session中的username来修改自己的信息
router.post('/updateByusername',function (req,res,next) {
    employeeDao.updateByusername(req,res,next);
});

//找出职位的类型
router.post('/selectEmployeePosition',function(req,res,next){
    employeeDao.selectEmployeePosition(req,res,next);
});

//按照职位找出员工
router.post('/selectEmployee_nameByPosition',function (req,res,next) {
    employeeDao.selectEmployee_nameByPosition(req,res,next);
});


/*
router.get('/updateInfo_Staff',function (req,res,next) {
    res.render('updateemployee');
});
*/
// 查出我的信息的 username
router.post('/selectByUsername',function (req,res,next) {
    employeeDao.selectByUsername(req,res,next);
});

//注销
router.post('/logout',function (req,res,next) {
    console.log("before modify:"+req.session.user);
    req.session.user=null;
    console.log("after modify:"+req.session.user);
    var status = {"status":"0"};
    res.json(status);
});

//修改密码
router.post('/modifyPassword',function (req,res,next) {
    console.log("modifyPassword-------req.session.user::",req.session.user);
    if(!req.body.password ){
        res.json({"status":"2"}); //密码为空
    }else{
        employeeDao.modifyPassword(req,res,next);
    }
});

module.exports = router;