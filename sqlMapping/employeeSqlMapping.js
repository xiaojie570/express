/**
 * Created by fuxia on 2017/4/2.
 */
var employee = {
    updateByusername:"update employee set employee_name=?, telephone=?,location=?,position=? where username=?",
    add:"insert into employee(id,username,employee_name) values(0,?,?)",
    //findByUsername:"select * from employee where username = ?"
    selectEmployeePosition : "select position from employee_position",
    selectPosition : "select * from employee_position where position=?",
    selectEmployee_nameByPosition: "select employee_name from employee where position=?",
    judgePositionAndEmployee : "select * from employee where position =? and employee_name=?",
    selectByUsername:"select * from employee where username=?",
    modifyPassword:"update user set password=? where username=?",
    selectPasswordByUsername:"select password from user where username=?",
    queryAll:"select * from employee",
    addPosition:"insert into employee_position(id,position) values(0,?)",
    updatePosition:"update employee_position set position=? where id=?",
    selectIfHavePositionEmployee:"select * from employee where position=?"
};
//,telephone=?,location=?,position=?
module.exports = employee;