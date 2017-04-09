/**
 * Created by fuxia on 2017/4/7.
 */
var express = require('express');
var router = express.Router();

var car_oilDao = require('../dao/car_oilDao');
var financialDao = require('../dao/financialDao');

//显示出所有加油记录
router.post('/queryAll',function (req,res,next) {
   car_oilDao.queryAll(req,res,next);
});

//添加一条加油记录
router.post('/addOneRecord',function (req,res,next) {
    if(!req.body.license_plate){
        res.json({"status":"1"});//车牌照不能为空
    }else if(!req.body.money){
        res.json({"status":"2"});//钱数不能为空
    }else {
        function show(suc) {
            if (suc) {
                financialDao.insertOilDefalut(req,res,next);
                res.json({"status":"0"});//增加成功
            }
        }
        car_oilDao.addOneRecord(req, res, next, show);
    }
});

//按照车牌照来查找加油记录
router.post('/queryRecordByLicense_plate',function (req,res,next) {
   car_oilDao.queryRecordByLicense_plate(req,res,next);
});

//删除一条加油记录
router.post('/deleteOneRecordByid',function (req,res,next) {
    function nextMethod(suc) {
        if(suc){
            res.json({"status:":0});
            //car_oilDao.queryAll(req,res,next);
        }else{
            res.json({"statua":"1"});//删除失败
        }
    }
    car_oilDao.deleteOneRecordByid(req,res,next,nextMethod);
});

//按照ID更新一条加油记录
router.post('/updateOneRecordByid',function (req,res,next) {
    function nextMethod(suc) {
        if(suc){
            car_oilDao.queryAll(req,res,next);
        }else{
            res.json({"status":"1"});//更新失败
        }
    }
    car_oilDao.updateOneRecordByid(req,res,next,nextMethod);
});

module.exports = router;