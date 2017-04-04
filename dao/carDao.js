/**
 * Created by fuxia on 2017/4/2.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/carSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function (res,ret) {
    if(typeof  ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    }else{
        res.json(ret);
    }
};

module.exports = {
    //增加车辆
    addCar: function (req,res,next) {
        pool.getConnection(function (err,connection) {
            var license_plate = req.body.license_plate;
            var position = req.body.position;
            var employee_name = req.body.employee_name;
            connection.query($sql.addCar,[license_plate,position,employee_name],function(err,result) {
                console.log(result+"+++++++++++++addCar++++++++++++++");
                if(result) {
                    res.json({"status": "0"}); //增加成功
                }else{
                    res.json({"status": "1"});//增加失败
                }
                connection .release();
            });
        });
    },

    querryAllCar:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.querryAllCar,function (err,result) {
                if(result.length === 0){
                    var status = {"status":1};
                }else{
                    res.json(result);
                }
                res.json(status);
            });
        });
    },
    //不可以重复添加（车牌号和司机）
    judegEmployee_nameAndlicense_plate:function (req,res,next,judegExist) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.judegEmployee_nameAndlicense_plate,[req.body.employee_name,req.body.license_plate],function (err,result) {
                var isExist;
                if(result.length === 0){  // 可以继续添加
                    isExist = false;
                }else{              //不可以添加
                    isExist = true;
                }
                judegExist(isExist);
            });
        });
    }

};