const { Role } = require('../models/models');

const roleData = [
    {
        title: 'Junior Developer',
        salary: 60000,
        department_id: 1,
    },
    {
        title: 'Head Chef',
        salary: 80000,
        department_id: 2,
    },
    {
        title: 'Bartender',
        salary: 60000,
        department_id: 2,
    },
    {
        title: 'Foreman',
        salary: 90000,
        department_id: 3,
    },
    {
        title: 'Janitor',
        salary: 55000,
        department_id: 4,
    },
];

const seedRole = () => Role.bulkCreate(roleData);

module.exports = seedRole;

