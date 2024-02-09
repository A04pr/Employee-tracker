const sequelize = require('../config/connections');
const seedDepartment = require('./deptartmentData');
const seedRole = require('./roleData');
const seedEmployee = require('./employeeData');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await seedDepartment();

    await seedRole();

    await seedEmployee();

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
