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
    //增加货物
    addGoods: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.addGoods, [req.body.loc_id, req.body.count, req.body.goods_name], function (err, result) {
                /*var status;
                if (result) {
                    status = {"status": "0"}; //增加成功
                } else {
                    status = {"status": "1"}; //增加失败
                }
                res.json(status);*/
                connection .release();
            })
        });
    },

    //通过货物id查找货物的储位
    selectByGood_id: function (req, res, next, next1) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.selectByGood_id, req.body.goods_id, function (err, result) {
                console.log("++++++++++++++++++---------------**************");
                //console.log(result[0]["loc_id"]);
                console.log("+++++++++++");
                if(result.length===0){
                    next1(null);
                }else {
                    next1(result[0]["loc_id"]);
                }
                connection .release();
            })
        });
    },

    //按照id来查找货物的数量
    selectCountByid:function (req,res,next,next2) {
        pool.getConnection(function (err,connection) {
           connection.query($sql.selectCount,req.body.goods_id,function (err,result){
              if(result.length ==0){
                  isExist = false;
                  next2(0,isExist);
              }else{
                  isExist = true;
                  next2(result[0]["count"],isExist);
              }
               connection.release();
           });
        });
    },


    //更新货物的数量
    updateCount:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.updateCount,[req.newCount,req.body.goods_id],function (err,result) {
                connection.release();
            })
        })
    },

    //通过id查找是否有该货物
    isExistGood:function (req,res,next,GoodId) {
        pool.getConnection(function (err,connection) {
           connection.query($sql.isExistGood,req.body.goods_id,function (err,result) {
               var isExist;
               console.log(result);
               console.log("11111111111111111");
               if(result) {
                   if (result.length === 0) {
                       isExist = false;
                   } else {
                       isExist = true;
                   }
               }else{
                   isExist = false;
               }
               GoodId(isExist);
               connection.release();
           });
        });
    },
    
    //通过货物的名字查找货物的goods_id
    selectGood_idByGood_name:function (req,res,next,nextMethod) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.selectGood_idByGood_name,req.body.goods_name,function (err,result) {
                nextMethod(result[0]["id"],result[0]["loc_id"]);
            });
        })
    },
    
    //查询一个货物的信息
    queryOne:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryOne,req.goods_id,function (err,result) {
                res.json(result);
                connection.release();
            });
        });
    },
    
    //显示所有货物信息
    queryAll:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryAll,function (err,result) {
                res.json(result);
                connection.release();
            })
        })
    }
}

