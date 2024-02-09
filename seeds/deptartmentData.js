const { Department } = require('../models/models');

const departmentData = [
    {
        department_name: 'Engineering',
    },
    {
        department_name: 'Food and Beverage',
    },
    {
        department_name: 'Construction',
    },
    {
        department_name: 'Hospitality',
    },
];

const seedDepartment = () => Department.bulkCreate(departmentData);

module.exports = seedDepartment;

