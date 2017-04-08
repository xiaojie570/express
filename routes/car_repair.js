/**
 * Created by fuxia on 2017/4/7.
 */
var express = require('express');
var router = express.Router();

var car_repair = require('../dao/car_repairDao');
var employeeDao = require('../dao/employeeDao');

//显示所有维修车辆的记录
router.post('/queryAll',function (req,res,next) {
    car_repair.queryAll(req,res,next);
});

//增加一个维修记录
router.post('/addOneRecord',function (req,res,next) {
    function nextMethod() {
        function show(suc) {
            if(suc){
                car_repair.queryAll(req,res,next);
            }else{
                res.json({"status":"1"}); //增加信息失败
            }
        }
        car_repair.addOneRecord(req,res,next,show);
    }
    employeeDao.selecEmployee_nametByUsername(req,res,next,nextMethod);

});

//查询当月维修记录
router.post('/queryByMonth',function (req,res,next) {
   car_repair.queryByMonth(req,res,next);
});

//查询当年维修记录
router.post('/queryByYear',function (req,res,next) {
    car_repair.queryByYear(req,res,next);
});

//删除一条维修记录
router.post('/deleteOneRecord',function (req,res,next) {
   function nextMethod() {
       car_repair.queryAll(req,res,next);
   }
   car_repair.deleteOneRecord(req,res,next,nextMethod);
});


module.exports = router;