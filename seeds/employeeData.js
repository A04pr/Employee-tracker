const { Employee } = require('../models');

const employeeData = [
    {
        employee_id: 0,
        first_name: 'Sarah',
        last_name: 'Gill',
        salary: 60000,
        department_id: 0,
    },
    {
        employee_id: 1,
        first_name: 'Landon',
        last_name: 'Wolfrum',
        salary: 80000,
        department_id: 1,
    },
    {
        employee_id: 2,
        first_name: 'Derek',
        last_name: 'Zumpano',
        salary: 60000,
        department_id: 1,
    },
    {
        employee_id: 3,
        first_name: 'Camdon',
        last_name: 'Lindsey',
        salary: 90000,
        department_id: 2,
    },
    {
        employee_id: 4,
        first_name: 'Joseph',
        last_name: 'Holdsworth',
        salary: 55000,
        department_id: 3,
    },
];

const seedEmployee = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployee;

