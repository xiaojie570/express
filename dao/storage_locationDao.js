/**
 * Created by fuxia on 2017/4/4.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/storage_locationSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');


// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports ={
    queryAll:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryAll,req.body.id,function (err,result) {
                if(result.length===0){
                    res.json({"status":"1"}) //查找失败
                }else{
                    res.json(result) //查找成功
                }
            });
        });
    }


};