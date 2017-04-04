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
        function carAdd(isExists) {
            if (isExists) { //职称和名字相互匹配
                carDao.addCar(req,res,next);
            } else {//职称和名字不匹配
                res.json({"status": "4"});//职称和名字不匹配
            }
        }
        employeeDao.judgePositionAndEmployee(req, res, next, carAdd);
    }
});


module.exports = router;