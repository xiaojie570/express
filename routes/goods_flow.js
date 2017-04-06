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
    /*}else if(!req.body.loc_id){
        res.json({"status":"2"});//储位为空*/
    }else if(!req.body.car_id){
        res.json({"status":"3"});//车辆为空
    }else if(!req.body.type){
        res.json({"status":"4"});//货物类型为空
    }else if(!req.body.count){
        res.json({"status":"5"});//货物数量为空
    }else if(!req.body.money){
        res.json({"status":"6"});//货物金额为空
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
                                res.json({"status": "33333"});  //没有货物了，不能出库了
                            } else {
                                goodsDao.updateCount(req, res, next);

                                function selectSurplus_sizeByGoods_id(surplus_size) {
                                    if (req.body.type == "入库") {
                                        req.body.surplus_size = (+surplus_size) - (+req.body.count);
                                    } else {
                                        req.body.surplus_size = (+surplus_size) + (+req.body.count);
                                    }
                                    storage_locationDao.updateOnestorageSize(req, res, next);
                                    goods_flowDao.addGoods_flow(req, res, next);
                                }
                                storage_locationDao.querySurplus_sizeByLoc_id(req, res, next, selectSurplus_sizeByGoods_id);

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


module.exports = router;
