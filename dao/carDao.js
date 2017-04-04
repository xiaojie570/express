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
    }
};