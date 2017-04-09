
/**
 * Created by fuxia on 2017/4/8.
 */
var express = require('express');
var router = express.Router();

var storage_locationDao = require('../dao/storage_locationDao');
var goods_flowDao = require('../dao/goods_flowDao');
var employee_salaryDao = require('../dao/employee_salaryDao');

//修改工资
router.post('/showSalary',function (req,res,next) {
    function newMethod(sum) {
        employee_salaryDao.updateSalary(req,res,next);
        //employee_salaryDao.showSalary(req,res,next);
    }
    goods_flowDao.selectOneMonthSumMoney(req,res,next,newMethod);
});

//查找自己当月总流动金额
router.post('/selectOneMonthSumMoney',function (req,res,next) {
    goods_flowDao.queryByUsername(req,res,next);
});

//显示所有人的工资
router.post('/queryAll',function (req,res,next) {
   employee_salaryDao.queryAll(req,res,next);
});

module.exports = router;