const { Employee } = require('../models/models');

const employeeData = [
    {
        first_name: 'Sarah',
        last_name: 'Gill',
        role_id: 1,
    },
    {
        first_name: 'Landon',
        last_name: 'Wolfrum',
        role_id: 2,
    },
    {
        first_name: 'Derek',
        last_name: 'Zumpano',
        role_id: 2,
    },
    {
        first_name: 'Camdon',
        last_name: 'Lindsey',
        role_id: 3,
    },
    {
        first_name: 'Joseph',
        last_name: 'Holdsworth',
        role_id: 4,
    },
];

const seedEmployee = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployee;

