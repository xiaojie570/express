/**
 * Created by fuxia on 2017/4/4.
 */
var express = require('express');
var router = express.Router();
var storage_locationDao = require("../dao/storage_locationDao");

router.post('/queryAll',function (req,res,next) {
    storage_locationDao.queryAll(req,res,next);
});

router.post('/queryOnestorage_locationbyId',function (req,res,next) {
   storage_locationDao.queryOnestorage_locationbyId(req,res,next);
});

//通过id更新仓库的大小
router.post('/updateOnestorage_locationbyId',function (req,res,next) {
    function queryAllAfterUpdate(storage_locationDao,suc) {
        if(suc){
            storage_locationDao.queryAll(req,res,next);
        }else{
            res.json({"status":"2"});//更新失败
        }
    }
    storage_locationDao.updateOnestorage_locationbyId(req,res,next,queryAllAfterUpdate);
});

module.exports = router;