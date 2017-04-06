/**
 * Created by fuxia on 2017/4/5.
 */

var express = require('express');
var router = express.Router();

var goodsDao = require('../dao/goodsDao');
var storage_locationDao = require('../dao/storage_locationDao');



//添加一个货物信息。添加货物的时候要添加仓库的为止，并且要判断仓库的存储量
router.post('/addGoods',function (req,res,next) {
    var front_count = req.body.count;
    function locExist(isExist,surplus_size) {
        if(isExist){ //如果仓库存在
            if(typeof +front_count== "number"){
                if(+front_count <= +surplus_size){
                    goodsDao.addGoods(req,res,next);
                    req.surplus_size = surplus_size-front_count;
                    storage_locationDao.updateOnestorageSize(req,res,next);
                }else{
                    res.json({"status":"2"}); //仓库没有位置了
                }
            }
        }else{
            res.json({"status":"1"});   //仓库不存在
        }
    }
    storage_locationDao.findLoc(req,res,next,locExist);
});

module.exports = router;