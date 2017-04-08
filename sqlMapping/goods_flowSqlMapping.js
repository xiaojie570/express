/**
 * Created by fuxia on 2017/4/6.
 */
var goods_flow = {
    addGoods_flow:"insert into goods_flow(id,goods_id,loc_id,car_id,type,count,money,username) values(0,?,?,?,?,?,?,?)",
    queryInGoods:"select * from goods_flow where type=?",
    queryByUsername:"select * from goods_flow where username=?",
    queryByUsernameAndOut:"select * from goods_flow where username=? and type=?",
    queryAll:"select * from goods_flow",
    selectOneMonthSumMoney:"select * from goods_flow where usernmae=? and month=?"
};

module.exports = goods_flow;