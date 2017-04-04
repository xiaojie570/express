/**
 * Created by fuxia on 2017/4/2.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/employeeSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');

var pool  = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    //在注册用户的时候，自动插入员工信息
    add:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.add,req.body.username,function (err,result) {
                connection.release();
            });
        });
    },
    //可以更新自己的信息
    updateByusername : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            var employee_name = req.body.employee_name;
            var telephone = req.body.telephone;
            var location = req.body.location;
            var position = req.body.position;
            var username = req.session.user.username;
            connection.query($sql.updateByusername,[employee_name,telephone,location,position,username],function (err,result) {
                console.log(position+"------------------updateByusername------------");
                if(result!=null){     // 更新成功
                    var status = {"status":0};
                }else{              //更新不成功
                    var status = {"status":1};
                }
                res.json(status);
                connection.release();
            });
        });
    },
    //暂时还有用到
    findByStaffid : function (req,res,next,findOne) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.findByStaffid,req.body.staffid,function (err,result) {
                var a;
                if(!result){ //如果没有记录
                    a = false;
                }else{
                    a = true;
                }
                findOne(a);
            });
        });
    },
    //显示职员的类别：司机or会计
    selectEmployeePosition : function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.selectEmployeePosition,function (err,result) {
                console.log(result);
                console.log("+++++++++++++++++++++++++selectEmployeePosition++++++++++++++++")
                let resultArr = result.map(item => {
                    return item.position;
                });
                jsonWrite(res,resultArr);
            });
            
        });
        
    },
    //按照职位找出对应的员工
    selectEmployee_nameByPosition: function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.selectEmployee_nameByPosition,req.body.position,function (err,result) {
                let resultArr = result.map(item =>{
                    return item.employee_name;
                });
                jsonWrite(res,resultArr);
            })
        })
    },

    selectPosition : function (req,res,next,updateInfo) {
        var mySelf = this;
        pool.getConnection(function(err,connection){
            connection.query($sql.selectPosition,req.body.position,function (err,result) {
                var isExist;
                console.log("=------------------------------------"+(result.length===0)+"=-------------------------------------------=====================selectPosition");
                if(!result){ //如果result为假，说明不存在
                    isExist = false;
               }else{
                    isExist = true;
                }
                updateInfo(isExist,mySelf);
            });
        });
    },

    judgePositionAndEmployee : function (req,res,next,carAdd) {
        pool.getConnection(function (err,connection) {
            var employee_name = req.body.employee_name;
            var position = req.body.employee_name;
            connection.query($sql.judgePositionAndEmployee,[employee_name,position],function (err,result) {
               var isExist;
               console.log(result+"判断职称和名字是否匹配judgePositionAndEmployee");
               console.log(result);
               console.log(!result);
               if(result.length===0){
                   console.log(result+"-----------------判断职称和名字是否匹配judgePositionAndEmployee");
                   isExist = false;
               }else{
                   console.log(result+"9++++++++++++++++++++++判断职称和名字是否匹配judgePositionAndEmployee");
                   isExist = true;
               }
               carAdd(isExist);
            });
        });
    }

};

