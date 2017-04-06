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
    goods_flowDao.addGoods_flow(req,res,next);
});


module.exports = router;
