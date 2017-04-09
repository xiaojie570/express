/**
 * Created by fuxia on 2017/4/7.
 */
var car_oil = {
    addOneRecord:"insert into car_oil(id,license_plate,money,year,month,day) values(0,?,?,?,?,?) ",
    queryAll:"select * from car_oil",
    queryRecordByLicense_plate:"select * from car_oil where license_plate=?",
    deleteOneRecordByid:"delete from car_oil where id=?",
    updateOneRecordByid:"update car_oil set license_plate=?, money=? where id=?"

};

module.exports = car_oil;
