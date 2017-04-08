/**
 * Created by fuxia on 2017/4/6.
 */

var express = require('express');
var router = express.Router();

var goodsDao = require('../dao/goodsDao');
var storage_locationDao = require('../dao/storage_locationDao');
var goods_flowDao = require('../dao/goods_flowDao');
var flow_typeDao = require('../dao/flow_typeDao');
var financialDao = require('../dao/financialDao');

//增加货物流动信息
router.post('/addGoods_flow',function (req,res,next){
    if(!req.body.goods_id){
        res.json({"status":"4"});//货物id为空
    /*}else if(!req.body.loc_id){
        res.json({"status":"2"});//储位为空*/
    }else if(!req.body.car_id){
        res.json({"status":"5"});//车辆为空
    }else if(!req.body.type){
        res.json({"status":"6"});//货物类型为空
    }else if(!req.body.count){
        res.json({"status":"7"});//货物数量为空
    }else if(!req.body.money){
        res.json({"status":"8"});//货物金额为空
    }else {
        function GoodId(isExist) {
            if(isExist) {
                function selectLoc_idByGoods_id(loc_id) {
                    if (loc_id != null) {
                        req["loc_id"] = loc_id;
                        function addgood(count, isExist) {
                            if (req.body.type == "入库") {
                                req["newCount"] = (+count) + (+req.body.count);
                            } else {
                                req["newCount"] = (+count) - (+req.body.count);
                            }
                            console.log(req.newCount);
                            console.log("111111111111111111111111111");
                            if (req.newCount < 0) {
                                res.json({"status": "3"});  //没有货物了，不能出库了
                            } else {
                                goodsDao.updateCount(req, res, next);

                                function selectSurplus_sizeByGoods_id(surplus_size) {
                                    if (req.body.type == "入库") {
                                        req.body.surplus_size = (+surplus_size) - (+req.body.count);
                                        financialDao.insertDefalut(req,res,next);

                                    } else {
                                        req.body.surplus_size = (+surplus_size) + (+req.body.count);

                                        financialDao.insertDefalut(req,res,next);
                                    }
                                    storage_locationDao.updateOnestorageSize(req, res, next);
                                    goods_flowDao.addGoods_flow(req, res, next);
                                    //goods_flowDao.queryAll(req,res,next);

                                }
                                storage_locationDao.querySurplus_sizeByLoc_id(req, res, next, selectSurplus_sizeByGoods_id);

                            }

                        }
                        goodsDao.selectCountByid(req, res, next, addgood);
                    } else {
                        res.json({"status": "1"});  //货物没有位置
                    }
                }

                goodsDao.selectByGood_id(req, res, next, selectLoc_idByGoods_id);
            }else{
                res.json({"status":"2"});//没有该货物，要先创建该货物，返回创建货物路由
            }
        }
        goodsDao.isExistGood(req,res,next,GoodId);
    }
});


//查询入库出库类型
router.post('/flow_typeDao',function (req,res,next) {
   flow_typeDao.queryAllType(req,res,next);
});

//查询入库信息
router.post('/queryInGoods',function (req,res,next) {
    goods_flowDao.queryInGoods(req,res,next);
});

//查询出库信息
router.post('/queryOutGoods',function (req,res,next) {
    goods_flowDao.queryOutGoods(req,res,next);
});

//按照username来查找进出库
router.post('/queryByUsername',function (req,res,next) {
     goods_flowDao.queryByUsername(req,res,next);
});

//查找自己的入库信息
router.post('/queryByUsernameAndIn',function (req,res,next) {
    goods_flowDao.queryByUsernameAndIn(req,res,next);
});

//查找自己的出库信息
router.post('/queryByUsernameAndOut',function (req,res,next) {
    console.log("queryByUsernameAndOut++++++++");
    goods_flowDao.queryByUsernameAndOut(req,res,next);
});

//查询出所有的出入库信息
router.post('/queryAll',function (req,res,next) {
   goods_flowDao.queryAll(req,res,next);
});

module.exports = router;


/*function addgood(count, isExist) {
 if (req.body.type == "入库") {
 req["newCount"] = (+count) + (+req.body.count);
 } else {
 req["newCount"] = (+count) - (+req.body.count);
 }
 if (req.newCount < 0) {
 res.json({"status": "3"});  //没有货物了，不能出库了
 } else {
 goodsDao.updateCount(req, res, next);

 }
 }

 goodsDao.selectCountByid(req, res, next, addgood);*/