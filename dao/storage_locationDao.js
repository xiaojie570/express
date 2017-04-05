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
    //查询所有仓库信息
    queryAll:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryAll,function (err,result) {
                if(result.length===0){
                    res.json({"status":"1"}) //查找失败
                }else{
                    res.json(result) //查找成功
                }
            });
        });
    },

    //查询一个仓库的信息
    queryOnestorage_locationbyId:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryOnestorage_locationbyId,req.body.id,function (err,result) {
               console.log(result+"+++++++++++");
               if(result.length ===0){
                   res.json({"status":"1"}) //查找失败
               }else{
                   res.json(result);
               }
            });
        });
    },

    //更改一个仓库的信息
    updateOnestorage_locationbyId:function (req,res,next,queryAllAfterUpdate) {
        var self = this;
        pool.getConnection(function (err,connection) {
           connection.query($sql.updateOnestorage_locationbyId,[req.body.size,req.body.id],function (err,result) {
               var suc;
               console.log(result);
               console.log((result.length ===0)+"++++++++++++++++++++++++");
               if(result.length ===0){
                   suc = false;//更新失败
                }else{
                   suc = true;//更新成功
                }
               queryAllAfterUpdate(self,suc);

           });
        });
    },

    //判断仓库是否存在
    findLoc:function (req,res,next,locExist) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.findLoc,req.body.id,function (err,result) {
                
            });
        });
    }



};