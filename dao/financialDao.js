
/**
 * Created by fuxia on 2017/4/8.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/financialSqlMapping');
var CryptoJS = require('crypto-js');


var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    //在修改第一次信息的时候插入默认值
    insertDefalut: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            connection.query($sql.insertOneRecore, [req.body.type, req.body.money*req.body.count, year,month,day], function (err, result) {
                connection.release();
            })
        })
    },
    //加油的时候插入financial
    insertOilDefalut: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            connection.query($sql.insertOneRecore, ["加油",req.body.money, year,month,day], function (err, result) {
                connection.release();
            })
        })
    },

    //修汽车的时候插入financial
    insertcar_repairDefalut: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            connection.query($sql.insertOneRecore, [req.body.service_details,req.body.money, year,month,day], function (err, result) {
                connection.release();
            })
        })
    },


}