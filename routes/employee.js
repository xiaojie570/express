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

//点击提交的时候要先判断职位是否存在
router.post('/updateStaffposition',function (req,res,next) {
     function updateInfo(isExists,employeeDao) {
         if(isExists){
                employeeDao.updateByusername(req,res,next);
         }else{
                res.json({"status":"1"});//position不存在
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

/*
router.get('/updateInfo_Staff',function (req,res,next) {
    res.render('updateemployee');
});
*/


module.exports = router;