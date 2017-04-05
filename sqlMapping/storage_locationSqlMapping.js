/**
 * Created by fuxia on 2017/4/4.
 */
var storage_location = {
    queryAll:"select * from storage_location",
    queryOnestorage_locationbyId:"select * from storage_location where id=?",
    updateOnestorage_locationbyId:"update storage_location set size=? where id=?"
};
 module.exports = storage_location;