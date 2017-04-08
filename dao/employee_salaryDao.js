
/**
 * Created by fuxia on 2017/4/8.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/employee_salarySqlMapping');
var CryptoJS = require('crypto-js');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    //在修改第一次信息的时候插入默认值
    insertDefalut:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.insertDefalut,[req.newSalary,req.newUsername,req.body.employee_name,0],function (err,result) {
            })
        })
    },

    //修改工资
    updateSalary:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.updateSalary,[req.sunMoney*0.05+1500,req.sunMoney,req.newUsername],function (err,result) {
                
            })
        })
    },

    //显示工资
    showSalary:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.showSalary,function (err,result) {
                res.json(result);
            })
        })
    }

};