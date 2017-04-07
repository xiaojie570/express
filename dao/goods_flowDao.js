/**
 * Created by fuxia on 2017/4/6.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/goods_flowSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    addGoods_flow:function (req,res,next) {
        pool.getConnection(function (err,connection) {
           connection.query($sql.addGoods_flow,[req.body.goods_id,req.loc_id,req.body.car_id,req.body.type,req.body.count,req.body.money,req.newUsername],function (err,result) {
               /*var status;
               if(result){
                   status = {"status":"0"}; //增加成功
               }else{
                   status = {"status":"1"}; //增加失败
               }
               res.json(status);*/
               connection .release();
           });
        });
    },

    //查询入库信息
    queryInGoods:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryInGoods,"入库",function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    },

    //查询出库信息
    queryOutGoods:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryInGoods,"出库",function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    },

    //按照username来查找进出库
    queryByUsername:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryByUsername,req.newUsername,function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    },
    
    //查找自己的出库信息
    queryByUsernameAndOut:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryByUsernameAndOut,[req.newUsername,"出库"],function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    },

    //查找自己的入库信息
    queryByUsernameAndIn:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryByUsernameAndOut,[req.newUsername,"入库"],function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    },
};