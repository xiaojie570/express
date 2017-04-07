/**
 * Created by fuxia on 2017/4/5.
 */
var goods = {
    addGoods :"insert into goods(id,loc_id,count,goods_name) values(0,?,?,?)",
    selectByGood_id:"select loc_id from goods where id=?",
    selectCount:"select count from goods where id=?",
    updateCount:"update goods set count=? where id=?",
    isExistGood:"select * from goods where id=?",
    selectGood_idByGood_name:"select * from goods where goods_name=?",
    queryOne:"select * from goods where id =?",
    queryAll:"select * from goods"
};

module.exports = goods;