/**
 * Created by fuxia on 2017/4/2.
 */
var car = {
    addCar:"insert into car(id,license_plate,position,employee_name) values(0,?,?,?)",
    querryAllCar:"select * from car",
    judegEmployee_nameAndlicense_plate:"select * from car where employee_name=? and license_plate=?",
    queryOne:"",
    updateEmployee_name:"update car set employee_name=? where license_plate=?"
};

module.exports = car;