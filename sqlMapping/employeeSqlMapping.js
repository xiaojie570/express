/**
 * Created by fuxia on 2017/4/2.
 */
var employee = {
    updateByusername:"update employee set employee_name=?, telephone=?,location=? where username=?",
    add:"insert into employee(id,username) values(0,?)",
    //findByUsername:"select * from employee where username = ?"
    selectEmployeePosition : "select position from employee_position",
    selectPosition : "select * from employee_position where position=>"
};
//,telephone=?,location=?,position=?
module.exports = employee;