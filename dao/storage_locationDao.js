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
                connection .release();
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
                connection .release();
            });
        });
    },

    //更改一个仓库的信息 之后显示所有仓库的信息
    updateOnestorage_locationbyId:function (req,res,next,queryAllAfterUpdate) {
        var self = this;
        pool.getConnection(function (err,connection) {
           connection.query($sql.updateOnestorage_locationbyId,[req.body.size,req.body.loc_id],function (err,result) {
               var suc;
               console.log(result);
               console.log((result.length ===0)+"++++++++++++++++++++++++");
               if(result.length ===0){
                   suc = false;//更新失败
                }else{
                   suc = true;//更新成功
                }
               queryAllAfterUpdate(self,suc);
               connection.release();

           });
        });
    },

    ///更改一个仓库的信息,只修改剩余位置大小
    updateOnestorageSize:function (req,res,next) {
        var self = this;
        pool.getConnection(function (err,connection) {
            connection.query($sql.updateOnestorageSizebyId,[req.body.surplus_size,req.loc_id],function (err,result) {
                connection.release();
            });
        });
    },

    //判断仓库是否存在
    findLoc:function (req,res,next,locExist) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.findLoc,req.body.loc_id,function (err,result) {
                var isExist;
                //console.log(result[0]["size"]);
                if(result) {
                    if (result.length === 0) {
                        isExist = false;  //仓库不存在
                        locExist(isExist,0);
                    } else {
                        isExist = true;
                        locExist(isExist,result[0]["surplus_size"]);
                    }

                }
                connection .release();
            });
        });
    },

    //通过Loc_id查询剩余位置
    querySurplus_sizeByLoc_id:function (req,res,next,n) {
        pool.getConnection(function (err,connection) {
           connection.query($sql.querySurplus_sizeByLoc_id,req.loc_id,function (err,result) {
               n(result[0]["surplus_size"]);
               connection .release();
           });
        });
    }
};