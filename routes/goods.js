/**
 * Created by fuxia on 2017/4/5.
 */

var express = require('express');
var router = express.Router();

var goodsDao = require('../dao/goodsDao');
var storage_locationDao = require('../dao/storage_locationDao');

router.post('/addGoods',function (req,res,next) {
    var front_count = req.body.count;
    function locExist(isExist,count) {
        if(isExist){ //如果仓库存在
            if(front_count){

            }
        }
    }
    storage_locationDao.findLoc(req,res,next,locExist);
});

module.exports = router;