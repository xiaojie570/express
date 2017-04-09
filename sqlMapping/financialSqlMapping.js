/**
 * Created by fuxia on 2017/4/8.
 */
var financial = {
    insertOneRecore:"insert into financial(id,type,money,year,month,day) values(0,?,?,?,?,?)",
    queryAll:"select * from financial"
};

module.exports = financial;