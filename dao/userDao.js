// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../SqlMapping/userSqlMapping');
var CryptoJS = require('crypto-js');
var crypto = require('crypto');


// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
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

    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            /*id=id.v4();
            console.log(id);*/
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',

            //密码加密的方式
           /* console.log("+++++++++++++++++++++++++++++++密");
            console.log(param.password);
            var content = 'param.password';  //加密明文
            var md5 = crypto.createHash('md5');//定义加密方式，md5不可逆
            md5.update(content);
            var password = md5.digest('hex'); //加密后的upassword*/
            console.log(param.password);
            console.log("+++++++++++++++++++++++++++++++密");
            console.log(req.body.username);
            connection.query($sql.insert, [req.body.username, req.body.password], function(err, result) {
                console.log(result + "------------------------------------------add");
                if(result) {
                    for (let key in result) {
                        if (result.hasOwnProperty(key)) {
                            console.log(`key:${key}-value:${result[key]}`);
                        }
                    }
                    var frount = {
                        code: 200,
                        msg:'增加成功',
                        table:result
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                //jsonWrite(res, frount);
                res.json({"status":"0"});//用户添加成功
                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var uid = req.query.uid;
            connection.query($sql.delete, uid, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.upassword == null  || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.upassword, param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }
                console.log(result);
                connection.release();
            });
        });
    },
    queryById: function (req, res, next, nextMyself) {
        var username = req.body.username; // 为了拼凑正确的sql语句，这里要转下整数
        let self = this;
        console.log("=============queryBYId111===========");
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, username, function(err, result) {
                console.log("=============queryBYId2222===========");
                console.log(username);
                var a = result;
                console.log(a);
                console.log(result);
                console.log(result.length);
                console.log("=============queryBYId33333333===========");
                /*console.log(a[0]["username"]);
                 console.log(a[0]["password"]);*/
                connection.release();
                console.log("------------------------------dao" );
                //console.log(result.length === 0);
                //.length === 0
                if(result.length === 0){//为真的时候有值，不可以继续插入 result==true时，说明有值，不可以插入；result==false时，没有 可以插入
                    a=true;
                }
                else{
                    a=false;
                }
                nextMyself(a, self);
                connection .release();
            });
        });
    },

    register_judgeUsername: function (req, res, next) {
        var username = req.body.username; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, username, function(err, result) {
                var a = result;
                console.log(a);
                console.log("++++++++++++++");
                console.log(result.length === 0);
                console.log("++++++++++++++");
                connection.release();


                if(result.length === 0 ){//为真的时候有值，不可以继续插入 result==true时，说明有值，不可以插入；result==false时，没有 可以插入
                    var status = {"status":0}; //可以插入
                }
                else{
                    var status = {"status":1}; //不可以插入
                }
                res.json(status);
            });
        });
    },

    //判断用户名和密码其中是否一个有问题
    login_correct: function (req,res,next,matchUsername) {
        var username = req.body.username;
        var password = req.body.password;

        console.log("============================================="+password);
        console.log(req.body.password);
        var p = {username:username,password:password};
        console.log(p);
        let self = this;
        console.log("=============queryBYId111===========");
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, username,function(err, result) {
                console.log("=============queryBYId2222===========");
                //console.log(err);
                console.log("=============queryBYIdendddddddddd===========");
                if(result.length === 0){
                    matchUsername(null,null);
                }
                else{
                    console.log(result[0]['password']);
                    matchUsername(result[0]['username'],result[0]['password']);
                }
                //jsonWrite(res,result);
                connection.release();
                //nextmethod(a[0]["uid"],a[0]["upassword"]);
            });
        });
    },
    queryOne: function (req, res, next) {
        var username = req.query.username; // 为了拼凑正确的sql语句，这里要转下整数
        console.log("queryOne----------------------------" + username);
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, username, function(err, result) {
                console.log("queryOne----------------------------" + result);
                jsonWrite(res,result);
                connection.release();
            });
        });

    },

    queryName_Pass: function (req, res, next, matchLogin) {
        var username = req.body.username; // 为了拼凑正确的sql语句，这里要转下整数
        var password = req.body.password;
        var self = this;
        console.log("queryOne用户名----------------------------" + username);

        pool.getConnection(function(err, connection) {
            connection.query($sql.query_correct, [username, password], function(err, result) {
                console.log("queryOne查询结果----------------------------" + result);
                console.log(result.length === 0);
                /*console.log(result[0]["username"]);
                 console.log(result[0]["password"]);*/
                connection.release();
                if(result.length === 0 ){
                    matchLogin(null,null);
                }else{
                    matchLogin(result[0]["username"],result[0]["password"]);
                }
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                /*result.forEach(item => {
                    delete item["name"];
                    delete item["age"];
                });*/
                /*let newResult = [];
                result.forEach(item => {
                    let i = {
                        id:item.id
                    };
                    newResult.push(i);
                });
                newResult.reverse();*/
                jsonWrite(res, result);
                connection.release();
            });
        });
    }

};
/* var a = {
 status:"200",
 aaaa:[1,2,3,4,"a",{b:"1"},true,"false"],
 table: result
 };
 a["a b"] = "新属性";
 for (let item in a) {
 if (a.hasOwnProperty(item)) {
 if(item === "status"){
 a[item] = 304;
 }
 }
 }
 jsonWrite(res, a);*/


/*var promise = new Promise(function (resolve, reject){
 pool.getConnection(function(err, connection) {
 connection.query($sql.queryById, uid, function(err, result) {
 console.log("=============queryBYId===========");
 connection.release();
 resolve(result.length === 0);
 });
 });
 });
 let self = this;
 promise.then(function(value){
 nextMyself(value, self);
 });*/

/**
 * 方法的功能
 *
 * @param {number} a 第一个数
 * @param b
 * @returns {*}
 */


/*
function abc(a, b) {
    return a + b;
}
*/
