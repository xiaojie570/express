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
                    res.json({"status": "6"});//增加失败
                }
                connection .release();
            });
        });
    },

    queryAllCar:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryAllCar,function (err,result) {
                if(result.length === 0){
                    var status = {"status":1};
                    res.json(status);
                }else{
                    res.json(result);
                }

                connection .release();
            });
        });
    },

    /*queryAllCar:function (req,res,next,returnIdandInfo) {
         pool.getConnection(function (err,connection) {
             connection.query($sql.queryAllCar,function (err,result) {
                 if(result.length === 0){
                     var status = {"status":1};
                     res.json(status);
                 }else {
                     var resultAll = result.map(item => {
                         return item.id;
                     });
                 }

                 returnIdandInfo(result,resultAll);
                 //res.json(result);
             });
         });
     },*/

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
                connection .release();
            });
        });
    },

    //查询一个车辆的信息
    queryOneCar: function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryOneCar,req.body.id,function (err,result) {
                if(result) {
                    res.json(result[0]);
                }else{
                    res.json({"status":'1'});//查询失败
                }
                connection .release();
            });
        });
    },

    //更改一个车辆信息
    updateOneCarInfo:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.updateOneCarInfo,[req.body.position,req.body.employee_name,req.body.license_plate],function (errr,result) {
                console.log("updateOneCarInfo+++++++++++"+result+"----------"+req.body.position);
                if(!result){
                    status = {"status":"1"};//更新失败
                }else{
                    status = {"status":"0"};//更新成功
                }
                res.json(status);
                connection .release();
            });
        });
    },

    //删除一辆汽车
    deleteOneCarBylicense_plate:function (req,res,next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.deleteOneCarBylicense_plate,[req.body.license_plate,req.body.employee_name],function (err,result) {
               var status;
                if(!result){
                    status = {"status":"1"};//删除失败
               }else{
                    status = {"status":"0"}; //删除成功
                }
                res.json(status);
                connection .release();
            });
        });
    }

};