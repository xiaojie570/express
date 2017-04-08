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
            res.json({"status":"0"});//更新正确
            //storage_locationDao.queryAll(req,res,next);
        }else{
            res.json({"status":"1"});//更新失败
        }
    }
    storage_locationDao.updateOnestorage_locationbyId(req,res,next,queryAllAfterUpdate);
});

//增加储位
router.post('/addOne',function (req,res,next) {
   function nextMethod(storage_locationDao,suc) {
       if(suc){
           res.json({"status":"0"});//更新正确
           //storage_locationDao.queryAll(req,res,next);
       }else{
           res.json({"status":"1"});//更新失败
       }
   }
   storage_locationDao.addOne(req,res,next,nextMethod);
});

//查找没有货物的储位
router.post('/queryNoGoods_id',function (req,res,next) {
   storage_locationDao.queryNoGoods_id(req,res,next);
});
module.exports = router;