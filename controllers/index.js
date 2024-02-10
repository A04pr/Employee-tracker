const express = require('express');
const { Department, Role, Employee } = require('../models');


const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());

// Get for departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get for roles
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get for employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logic for adding a new department
app.post('/api/departments', async (req, res) => {
  const { department_name } = req.body;
  try {
    const newDepartment = await Department.create({ department_name });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logic for adding a new role
app.post('/api/roles', async (req, res) => {
  const { title, salary, department_id } = req.body;
  try {
    const newRole = await Role.create({ title, salary, department_id });
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error adding role:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logic for adding a new employee
app.post('/api/employees', async (req, res) => {
  const { first_name, last_name, role_id, manager_id } = req.body;
  try {
    const newEmployee = await Employee.create({ first_name, last_name, role_id, manager_id });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});