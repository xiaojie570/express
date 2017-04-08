/**
 * Created by fuxia on 2017/4/7.
 */
var car_repair = {
    addOneRecord:"insert into car_repair(id,license_plate,service_details,employee_name,money,year,month,day) values(0,?,?,?,?,?,?,?)",
    queryAll:"select * from car_repair",
    queryByMonth:"select * from car_repair where month=?",
    queryByYear:"select * from car_repair where year=?",
    deleteOneRecord:"delete * from car_repair where id=?",
    queryByYearandlicense_plate:"select * from car_repair where year=? and license_plate=?",
    queryByMonthandlicense_plate:"select * from car_repair where month=? and license_plate=?"
};
module.exports = car_repair;