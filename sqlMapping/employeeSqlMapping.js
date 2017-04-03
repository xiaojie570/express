/**
 * Created by fuxia on 2017/4/2.
 */
var employee = {
    updateByStaffid:"update employee set employee_name=?,telephone=?,location=?,position=? where staffid=?",
    add:"insert into employee(id,staffid) values(0,?)",
    findByStaffid:"select * from employee where staffid = ?"
};

module.exports = employee;