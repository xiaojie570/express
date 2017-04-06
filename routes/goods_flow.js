/**
 * Created by fuxia on 2017/4/6.
 */

var express = require('express');
var router = express.Router();

var goodsDao = require('../dao/goodsDao');
var storage_locationDao = require('../dao/storage_locationDao');
var goods_flowDao = require('../dao/goods_flowDao');

//增加货物流动信息
router.post('/addGoods_flow',function (req,res,next){
    if(!req.body.goods_id){
        res.json({"status":"1"});//货物id为空
    }else if(!req.body.loc_id){
        res.json({"status":"2"});//储位为空
    }else if(!req.body.car_id){
        res.json({"status":"3"});//车辆为空
    }else if(!req.body.type){
        res.json({"status":"4"});//货物类型为空
    }else if(!req.body.count){
        res.json({"status":"5"});//货物数量为空
    }else if(!req.body.money){
        res.json({"status":"6"});//货物金额为空
    }else {
        goods_flowDao.addGoods_flow(req, res, next);
    }
});


module.exports = router;
