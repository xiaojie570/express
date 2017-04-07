/**
 * Created by fuxia on 2017/4/4.
 */
var storage_location = {
    queryAll:"select * from storage_location",
    queryOnestorage_locationbyId:"select * from storage_location where loc_id=?",
    updateOnestorage_locationbyId:"update storage_location set size=? where loc_id=?",
    findLoc:"select * from storage_location where loc_id=?",
    updateOnestorageSizebyId:"update storage_location set surplus_size=? where loc_id=?",
    querySurplus_sizeByLoc_id:"select surplus_size from storage_location where loc_id=?",
    addOne:"insert into storage_location(loc_id,size,surplus_size,goods_id) values(0,?,?)",
    updateGoods_id:"update storage_location set goods_id =? where loc_id=?",
    queryNoGoods_id:"select loc_id from storage_location where goods_id=?"

};
 module.exports = storage_location;