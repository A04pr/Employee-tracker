const { Department } = require('../models/models');

const departmentData = [
    {
        department_id: 0,
        department_name: 'Engineering',
    },
    {
        department_id: 1,
        department_name: 'Food and Beverage',
    },
    {
        department_id: 2,
        department_name: 'Construction',
    },
    {
        department_id: 3,
        department_name: 'Hospitality',
    },
];

const seedDepartment = () => Department.bulkCreate(departmentData);

module.exports = seedDepartment;

