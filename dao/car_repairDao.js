/**
 * Created by fuxia on 2017/4/7.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/car_repairSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    //增加维修信息
    addOneRecord:function (req,res,next,show) {
        var self = this;
        pool.getConnection(function (err,connection) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDay();
            connection.query($sql.addOneRecord,[req.body.license_plate,req.body.service_details,req.Newemployee_name,req.body.money,year,month,day],function (err,result) {
                var suc;
                if(result.affectedRows>0){ //添加成功
                    console.log("000000000000000000");
                    suc = true;
                }else{
                    suc = false;
                }
                show(suc);
                connection.release();
            });
        });
    },

    //显示所有维修记录
    queryAll:function (req,res,next) {
        pool.getConnection(function(err,connection){
            connection.query($sql.queryAll,function (err,result) {
                res.json(result);
                connection.release();
            });
        });
    },

    //查询当月维修记录
    queryByMonth:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryByMonth,((new Date()).getMonth()+1),function (err,result) {
                res.json(result);
            });
        })
    },

    //查询当年维修记录
    queryByYear:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryByYear,((new Date()).getFullYear()),function (err,result) {
                res.json(result);
                connection.release();
            });
        })
    },

    //删除一条记录
    deleteOneRecord:function (req,res,next) {
        pool.getConnection(function (err,result) {
            connection.query($sql.deleteOneRecord,req.body.id,function (err,result) {
                if(result.affectedRows>0){
                    res.json({"status":"0"});
                }else{

                    res.json({"status":"1"});
                }
                connection.release();
            })
        })
    },

    //按照车牌照查找当年的维修记录
    queryByYearandlicense_plate:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            var date = new Date();
            var year = date.getFullYear();
            connection.query($sql.queryByYearandlicense_plate,[year,req.body.license_plate],function (err,result) {
                res.json(result);
            })
        })
    },

    //按照车牌照查找当年的维修记录
    queryByMonthandlicense_plate:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            var date = new Date();
            var month = date.getMonth();
            connection.query($sql.queryByMonthandlicense_plate,[month,req.body.license_plate],function (err,result) {
                res.json(result);
            })
        })
    }

};