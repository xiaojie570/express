/**
 * Created by fuxia on 2017/4/5.
 */
var goods = {
    addGoods :"insert into goods(id,loc_id,count,goods_name) values(0,?,?,?)",
    selectByGood_id:"select loc_id from goods where id=?"
};

module.exports = goods;