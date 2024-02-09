const { Role } = require('../models');

const roleData = [
    {
        role_id: 0,
        title: 'Junior Developer',
        salary: 60000,
        department_id: 0,
    },
    {
        role_id: 1,
        title: 'Head Chef',
        salary: 80000,
        department_id: 1,
    },
    {
        role_id: 2,
        title: 'Bartender',
        salary: 60000,
        department_id: 1,
    },
    {
        role_id: 3,
        title: 'Foreman',
        salary: 90000,
        department_id: 2,
    },
    {
        role_id: 4,
        title: 'Janitor',
        salary: 55000,
        department_id: 3,
    },
];

const seedRole = () => Role.bulkCreate(roleData);

module.exports = seedRole;

