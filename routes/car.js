/**
 * Created by fuxia on 2017/4/2.
 */
var express = require('express');
var router = express.Router();

var carDao =require('../dao/carDao');
var employeeDao = require("../dao/employeeDao");
//增加车辆
router.post('/addCar',function (req,res,next) {
    if(!req.body.license_plate){
        res.json({"status":"1"}); //license_plate(车牌照)不能为空
    }else if(!req.body.position){
        res.json({"status":"2"});//position(职位)不能为空
    }else if(!req.body.employee_name){
        res.json({"status":"3"});//employee_name(名字不能为空)
    }else {
        function judegExist(isExist)
        {
            if(isExist){
                res.json({"status":"5"});//不可以重复添加（车牌号和司机）
            }else {
                function carAdd(isExists) {
                    if (isExists) { //职称和名字相互匹配
                        carDao.addCar(req, res, next);
                    } else {//职称和名字不匹配
                        res.json({"status": "4"});//职称和名字不匹配
                    }
                }

                employeeDao.judgePositionAndEmployee(req, res, next, carAdd);
            }
        }
        carDao.judegEmployee_nameAndlicense_plate(req,res,next,judegExist);
    }
});

//查询所有车辆
router.post('/queryAllCar',function (req,res,next) {
    console.log("queryAllCar++++++++++");
    carDao.queryAllCar(req,res,next);
});


/*
//查询所有车辆
 router.post('/queryAllCar',function (req,res,next) {
     function returnIdandInfo(result,resultAll) {
         carDao.queryAllCar(req,res,next);

         /!*let newResult = [];
         result.forEach(item => {
             let i = {
                 id:item.id
             };
             newResult.push(i);
         });
         newResult.reverse();*!/
     }
    carDao.queryAllCar(req,res,next,returnIdandInfo);
 });
*/

//查询一个车辆的信息
router.post('/queryOneCar',function (req,res,next) {
    console.log("queryOneCar+++++++++++++++++++");
    carDao.queryOneCar(req,res,next);
});

//更改一个车辆的信息
router.post('/updateOneCarInfo',function (req,res,next) {
    console.log("updateOneCarInfo++++++++++"+"carjssssssssss");
    if(!req.body.license_plate){
        status = {"status":"2"};//车牌照不能为空
        res.json(status);
    }else if(!req.body.employee_name){
        status = {"status":"3"};//司机不能为空
        res.json(status);
    }else if(!req.body.position) {
        status = {"status": "4"};// 职位不能为空
        res.json(status);
    }else{
        function judegExist(isExist)
        {
            if(isExist){
                res.json({"status":"5"});//不可以重复添加（车牌号和司机）
            }else {
                function updateCar(isExists) {
                    if (isExists) { //职称和名字相互匹配
                        carDao.updateOneCarInfo(req, res, next);
                    } else {//职称和名字不匹配
                        res.json({"status": "6"});//职称和名字不匹配
                    }
                }
                employeeDao.judgePositionAndEmployee(req, res, next, updateCar);
            }
        }
        carDao.judegEmployee_nameAndlicense_plate(req,res,next,judegExist);
    }
});

module.exports = router;