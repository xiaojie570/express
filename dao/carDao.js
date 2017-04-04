/**
 * Created by fuxia on 2017/4/2.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/carSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');

var pool  =  mysql.createConnection($util.extend({},$conf.mysql));

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
    addCar: function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.addCar,[req.body.license_plate,req.body.username],function (err,result) {
                res.json({"status":"0"}); //增加成功
                connection .release();
            });
        });
    }
};