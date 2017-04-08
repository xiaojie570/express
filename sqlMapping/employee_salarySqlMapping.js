
/**
 * Created by fuxia on 2017/4/8.
 */
var employee_salary = {
    insertDefalut:"insert into employee_salary(id,salary,username,employee_name,money) values(1,?,?,?,?)",
    updateSalary:"update employee_salary set salary=?,money=? where username=?",
    showSalary:"select * from employee_salary"
};

module.exports = employee_salary;