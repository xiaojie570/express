// dao/userSqlMapping.js
// CRUD SQL语句
/*
var user = {
    insert:'INSERT INTO user(uuid, uid, upassword, uname, uloc) VALUES(?,?,?,?,?)',
    update:'update user set upassword=? where uid=?',
    delete: 'delete from user where uid=?',
    queryById: 'select * from user where uid=?',
    queryAll: 'select * from user',
    query_correct: 'select * from user where uid=? and upassword=?'

};

module.exports = user;*/
var user = {
    insert:'INSERT INTO user(id, username,password) VALUES(0,?,?)',
    update:'update user set password=? where username=?',
    delete: 'delete from user where username=?',
    queryById: 'select * from user where username=?',
    queryAll: 'select * from user',
    query_correct: 'select * from user where username=? and password=?'

};

module.exports = user;