const Department = require('./department');
const Role = require('./role');
const Employee = require('./employee');

Department.hasMany(Role, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE',
});
  
Role.belongsTo(Department, {
    foreignKey: 'department_id',
});
  
  
Role.hasMany(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});
  
Employee.belongsTo(Role, {
    foreignKey: 'role_id',
});


module.exports = {
  Employee,
  Role,
  Department
};
