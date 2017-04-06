/**
 * Created by fuxia on 2017/4/2.
 */
var car = {
    addCar:"insert into car(id,license_plate,position,employee_name) values(0,?,?,?)",
    queryAllCar:"select * from car",
    judegEmployee_nameAndlicense_plate:"select * from car where employee_name=? and license_plate=?",
    queryOneCar:"select * from car where id=?",
    updateOneCarInfo:"update car set position=?,employee_name=? where license_plate=?",
    deleteOneCarId:"delete from car where id=?"

};

module.exports = car;