
/**
 * Created by fuxia on 2017/4/7.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/car_oilSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    //查询所有加油记录
    queryAll:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryAll,function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    },

    //增加一条加油记录
    addOneRecord:function (req,res,next,show) {
        var self = this;
        pool.getConnection(function (err,connection) {
            var date =new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();

            connection.query($sql.addOneRecord,[req.body.license_plate,req.body.money,year,month,day],function (err,result) {
                var suc;
                if(result.affectedRows>0){
                    suc = true;
                }else{
                    suc = false;
                }
                show(suc);
                connection.release();
            })
        })
    },
    
    
    //按照车牌照来查找加油记录
    queryRecordByLicense_plate:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryRecordByLicense_plate,req.body.license_plate,function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    },
    
    //删除一条加油记录
    deleteOneRecordByid:function (req,res,next,nextMethod) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.deleteOneRecordByid,req.body.id,function (err,result) {
                var suc;
                if(result.affectedRows>0){
                    suc = true;
                }else{
                    suc = fales;
                }
                nextMethod(suc);
                connection.release();
            });
        });
    },

    //按照ID更新一条加油记录
    updateOneRecordByid:function (req,res,next,nextMethod) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.updateOneRecordByid,[req.body.license_plate,req.body.money,req.body.id],function (err,result) {
                var suc;
                if(resulr.affectedRows>0){
                    suc = true;
                }else{
                    suc = false;
                }
                nextMethod(suc);
                connection.release();
            });
        })
    }

};
