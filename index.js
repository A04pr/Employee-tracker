const inquirer = require('inquirer');
const { Department, Role, Employee } = require('./models/models');

async function init() {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
      ],
    });
  
    switch (choice) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Delete a department':
        await deleteDepartment();
        break;
      case 'Delete a role':
        await deleteRole();
        break;
      case 'Delete an employee':
        await deleteEmployee();
        break;
    }
  }

  // Shows all departments with their name and id
async function viewAllDepartments() {
    try {
      const departments = await Department.findAll();
      const formattedDepartments = departments.map(department => ({
        name: department.department_name
      }));
      console.table(formattedDepartments);
    } catch (error) {
      console.error('Error viewing departments:', error);
    }
}

  // Shows all roles with their name, id, and the department they belong to
async function viewAllRoles() {
    try {
      const roles = await Role.findAll();
      const formattedRoles = roles.map(role => ({
        title: role.title,
        salary: role.salary,
        department: role.department_id,
      }));
      console.table(formattedRoles);
    } catch (error) {
      console.error('Error viewing roles:', error);
    }
  }

    // Shows all employees with their first and last name, id, and role
async function viewAllEmployees() {
    try {
      const employees = await Employee.findAll();
      const formattedEmployees = employees.map(employee => ({
        first: employee.first_name,
        last: employee.last_name,
        role: employee.role_id,
      }));
      console.table(formattedEmployees);
    } catch (error) {
      console.error('Error viewing employees:', error);
    }
  }

    // Adds a department after recieving an input for department name
async function addDepartment() {
  try {
    const { department_name } = await inquirer.prompt({
      type: 'input',
      name: 'department_name',
      message: 'Enter the name of the department:',
    });

    await Department.create({ department_name });
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

    // Adds a role after recieving an input for the title, salary, and department id
async function addRole() {
    try {
        const { title, salary, department_id } = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the role:',
          },
          {
            type: 'input',
            name:'salary',
            message: 'Enter the annual salary of the role:',
          },
          {
            type: 'input',
            name:'department_id',
            message: 'Enter the id of the department:',
          }
        ]);
    
        await Role.create({ title, salary, department_id });
        console.log('Role added successfully!');
    } catch (error) {
        console.error('Error adding role:', error);
    }
}

    // Adds an employee after recieving an input for first name, last name, and role.
async function addEmployee() {
  try {
    const employeeDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter employee first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter employee last name:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select employee role:',
        choices: await getRoleChoices(),
      },
    ]);

    await Employee.create(employeeDetails);
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

// Changes an employee role
async function updateEmployeeRole() {
  try {
    const employees = await Employee.findAll();

    const { employeeId } = await inquirer.prompt({
      type: 'list',
      name: 'employeeId',
      message: 'Select employee:',
      choices: employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employee_id,
      })),
    });

    const { roleId } = await inquirer.prompt({
      type: 'list',
      name: 'roleId',
      message: 'Select new role:',
      choices: await getRoleChoices(), 
    });

    await Employee.update({ role_id: roleId }, {
      where: { employee_id: employeeId },
    });

    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

// Creates a list of roles currently in the database
async function getRoleChoices() {
  try {
    const roles = await Role.findAll();
    return roles.map(role => ({
      name: role.title,
      value: role.role_id,
    }));
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

// Deletes a department
async function deleteDepartment() {
  try {
    const departments = await Department.findAll();
    const departmentChoices = departments.map(department => ({
      name: department.department_name,
      value: department.department_id,
    }));

    const { departmentId } = await inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: 'Select the department to delete:',
      choices: departmentChoices,
    });

    await Department.destroy({
      where: {
        department_id: departmentId
      }
    });

    console.log('Department deleted successfully!');
  } catch (error) {
    console.error('Error deleting department:', error);
  }
}

// Deletes a role
async function deleteRole() {
  try {
    const roles = await Role.findAll();
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.role_id,
    }));

    const { roleId } = await inquirer.prompt({
      type: 'list',
      name: 'roleId',
      message: 'Select the role to delete:',
      choices: roleChoices,
    });

    await Role.destroy({
      where: {
        role_id: roleId
      }
    });

    console.log('Role deleted successfully!');
  } catch (error) {
    console.error('Error deleting role:', error);
  }

}

// Deletes an employee
async function deleteEmployee() {
  try {
    const employees = await Employee.findAll();
    const employeeChoices = employees.map(employee => ({
      name: employee.first_name + ' ' + employee.last_name,
      value: employee.employee_id,
    }));

    const { employeeId } = await inquirer.prompt({
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to delete:',
      choices: employeeChoices,
    });

    await Employee.destroy({
      where: {
        employee_id: employeeId
      }
    });

    console.log('Employee deleted successfully!');
  } catch (error) {
    console.error('Error deleting employee:', error);
  }

}
init();