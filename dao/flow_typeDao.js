/**
 * Created by fuxia on 2017/4/6.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/flow_typeSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    queryAllType:function (req,res,next) {
        pool.getConnection(function (err,connection) {
           connection.query($sql.queryAll,function (err,result) {

               let resultArr = result.map(item => {
                   return item.flow_type;
               });
               res.json(resultArr);

               connection.release();
           })
        });
    }
};