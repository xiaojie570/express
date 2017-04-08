
/**
 * Created by fuxia on 2017/4/8.
 */
var express = require('express');
var router = express.Router();

var storage_locationDao = require('../dao/storage_locationDao');
var goods_flowDao = require('../dao/goods_flowDao');
var employee_salary = require('../dao/employee_salaryDao');

router.post('/updateSalary',function (req,res,next) {
    function newMethod(suc) {
        
    }
    goods_flowDao.selectOneMonthSumMoney(req,res,next,newMethod);
})

module.exports = router;