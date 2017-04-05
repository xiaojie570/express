/**
 * Created by fuxia on 2017/4/5.
 */

var express = require('express');
var router = express.Router();

var goodsDao = require('../dao/goodsDao');
var storage_locationDao = require('../dao/storage_locationDao');

router.post('/addGoods',function (req,res,next) {
    function locExist() {
        
    }
    goodsDao.addGoods(req,res,next);
});

module.exports = router;