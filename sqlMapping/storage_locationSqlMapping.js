/**
 * Created by fuxia on 2017/4/4.
 */
var storage_location = {
    queryAll:"select * from storage_location",
    queryOnestorage_locationbyId:"select * from storage_location where loc_id=?",
    updateOnestorage_locationbyId:"update storage_location set size=? where loc_id=?",
    findLoc:"select * from storage_location where loc_id=?",
    updateOnestorageSizebyId:"update storage_location set surplus_size=? where loc_id=?",
    querySurplus_sizeByLoc_id:"select surplus_size from storage_location where loc_id=?"
};
 module.exports = storage_location;