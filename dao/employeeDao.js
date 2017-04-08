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
            var employee_name = '我是用户名';
            connection.query($sql.add,[req.body.username,employee_name],function (err,result) {
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
            var username = req.newUsername;
            connection.query($sql.updateByusername,[employee_name,telephone,location,position,req.body.username],function (err,result) {
                console.log(position+"------------------updateByusername------------");
                if(result!=null){     // 更新成功
                    var status = {"status":0};
                    console.log(status);
                    console.log(employee_name);
                    /*console.log(telephone);
                    console.log(location);*/
                    console.log(username);
                    console.log("=============");
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
                connection .release();
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
                connection .release();
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
                connection .release();
            })
        })
    },

    selectPosition : function (req,res,next,updateInfo) {
        var mySelf = this;
        pool.getConnection(function(err,connection){
            connection.query($sql.selectPosition,req.body.position,function (err,result) {
                var isExist;
                if(result.length ===0){ //如果result为假，说明不存在
                    isExist = false;
               }else{
                    isExist = true;
                }
                updateInfo(isExist,mySelf);
                connection .release();
            });
        });
    },

    judgePositionAndEmployee : function (req,res,next,carAdd) {
        pool.getConnection(function (err,connection) {
            var employee_name = req.body.employee_name;
            var position = req.body.position;
            console.log(employee_name);
            console.log(position);
            connection.query($sql.judgePositionAndEmployee,[position,employee_name],function (err,result) {
               var isExist;
               console.log(result+"判断职称和名字是否匹配judgePositionAndEmployee");
               console.log(result.length===0);
               console.log(!result);
               if(result.length===0){
                   console.log(result+"-----------------判断职称和名字是否匹配judgePositionAndEmployee");
                   isExist = false;
               }else{
                   console.log(result+"9++++++++++++++++++++++判断职称和名字是否匹配judgePositionAndEmployee");
                   isExist = true;
               }
               carAdd(isExist);
               connection .release();
            });
        });
    },

    selectByUsername:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.selectByUsername,req.newUsername,function (err,result) {
                result.forEach(item => {
                    delete item["id"];
                    delete item["username"];
                });
                if(result.length == 0 ){
                    result
                }
                res.json(result[0]);
                connection .release();
            });
        })
    },

    //修改密码
    modifyPassword : function (req,res,next) {
        pool.getConnection(function (err, connection) {
               connection.query($sql.modifyPassword,[req.body.password,req.newUsername],function (err,result) {
                var status;
                if(result.affectedRows > 0){
                    status = {"status":"0"};//修改成功
                }else{
                    status = {"status":"1"};//修改不成功
                }
                res.json(status);
                connection.release();
            });
        });
    },

    //查找原有密码
    selectPasswordByUsername:function (req,res,next,modifypass) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.selectPasswordByUsername,req.newUsername,function (err,result) {
                let resultArr = result.map(item =>{
                    return item.password;
                });
                console.log("resultArr:"+resultArr);
                //res.json(resultArr);
                modifypass(resultArr);
                connection.release();
            });
        });
    },


    //查询所有员工信息
    queryAll:function (req,res,next) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryAll,function (err,result) {
                res.json(result);
                connection.release();
            });
        });
    },

    //根据username查询emoployee_name用户名字
    selecEmployee_nametByUsername:function (req,res,next,nextMethod) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.selectByUsername,req.newUsername,function (err,result) {
                req["Newemployee_name"] = result[0]["employee_name"];
                nextMethod();
                connection.release();
            });
        })
    },

    //增加职位类型
    addPosition:function (req,res,next,nextMethod) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.addPosition,req.body.position,function (err,result) {
                var suc;
                if(result.affectedRows>0){
                    suc =true;
                }else{
                    suc =false;
                }
                nextMethod(suc);
                connection.release();
            })
        })
    },
    
    //更新职位信息
    updatePosition:function (req,res,next,nextMethod) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.updatePosition,[req.body.position,req.body.id],function (err,result) {
                var suc;
                if(result.affectedRows>0){
                    suc =true;
                }else{
                    suc =false;
                }
                nextMethod(suc);
                connection.release();
            })
        })
    },

    //判断是否有该职位的员工
    selectIfHavePositionEmployee:function (req,res,next,haveOrNot) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.selectIfHavePositionEmployee,req.body.position,function (err,result) {
                var suc;
                if(result.length === 0){
                    suc =false;
                }else{
                    suc =true;
                }
                haveOrNot(suc);
                connection.release();
            })
        })
    },
};

