/**
 * Created by fuxia on 2017/4/2.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/employeeSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');

var pool  = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.add,req.body.username,function (err,result) {

                connection.release();
            });
        });
    },
    updateByStaffid : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            console.log(req.session.user.username);
            console.log("updateByStaffid111111111111++++++++++++++++++++++++++++++++++++");
            var employee_name = req.body.employee_name;
            var telephone = req.body.telephone;
            var location = req.body.location;
            var position = req.body.position;

            connection.query($sql.updateByStaffid,[employee_name,telephone,location,position,req.session.user.username],function (err,result) {
                console.log("updateByStaffid2222222222++++++++++++++++++++++++++++++++++++");
                console.log(employee_name);
                console.log(telephone);
                console.log(location);
                console.log(req.session.user.username);
                jsonWrite(res,result);
                connection.release();
            });
        });
    },

    findByStaffid:function (req,res,next,findOne) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.findByStaffid,req.body.staffid,function (err,result) {
                var a;
                if(!result){ //如果没有记录
                    a = false;
                }else{
                    a = true;
                }
                findOne(a);
            });
        });
    }
};