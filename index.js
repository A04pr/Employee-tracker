const inquirer = require('inquirer');
const { Department, Role, Employee } = require('./models');

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
    }
  }

async function viewAllDepartments() {
    try {
      const departments = await Department.findAll();
      console.table(departments);
    } catch (error) {
      console.error('Error viewing departments:', error);
    }
  }

async function viewAllRoles() {
    try {
      const roles = await Role.findAll();
      console.table(roles);
    } catch (error) {
      console.error('Error viewing roles:', error);
    }
  }

async function viewAllEmployees() {
    try {
      const employees = await Employee.findAll();
      console.table(employees);
    } catch (error) {
      console.error('Error viewing employees:', error);
    }
  }

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

async function addRole() {
    try {
        const { title, salary } = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the role:',
          },
          {
            type: 'input',
            name:'salary',
            message: 'Enter the annual salary of the role:',
          }
        ]);
    
        await Role.create({ title, salary });
        console.log('Role added successfully!');
    } catch (error) {
        console.error('Error adding role:', error);
    }
}

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

async function updateEmployeeRole() {
  try {
    const employees = await Employee.findAll();

    const { employeeId } = await inquirer.prompt({
      type: 'list',
      name: 'employeeId',
      message: 'Select employee:',
      choices: employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })),
    });

    const { roleId } = await inquirer.prompt({
      type: 'list',
      name: 'roleId',
      message: 'Select new role:',
      choices: await getRoleChoices(), 
    });

    await Employee.update({ role_id: roleId }, {
      where: { id: employeeId },
    });

    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

async function getRoleChoices() {
  try {
    const roles = await Role.findAll();
    return roles.map(role => ({
      name: role.title,
      value: role.id,
    }));
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

init();