/**
 * Created by fuxia on 2017/4/5.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/goodsSqlMapping');
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
    addGoods:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.addGoods,[req.body.loc_id,req.body.count,req.body.goods_name],function (err,result) {
                var status;
                if(result){
                    status = {"status":"0"}; //增加成功
                }else{
                    status = {"status":"1"}; //增加失败
                }
                res.json(status);
            })
        });
    }
};