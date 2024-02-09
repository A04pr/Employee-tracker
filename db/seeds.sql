INSERT INTO department (department_name)
VALUES ("Lift Ops"),
       ("Food & Beverage"),
       ("Hospitality"),
       ("Medical");

INSERT INTO role (title, salary)
VALUES ("Lift Operator", 40000),
       ("Head Chef", 75000),
       ("Line Cook", 45000),
       ("Janitor", 50000),
       ("Hospitality Admin", 80000),
       ("Nurse", 60000),
       ("Doctor", 120000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tracy", "Calvins", 6, NULL),
       ("Kalli", "Cera", 1, NULL),
       ("Kevin", "Star", 2, NULL),
       ("Maya", "Viselli", 3, NULL),
       ("Boris", "Konev", 5, NULL),
       ("Tyler", "Steinkamp", 4, NULL),
       ("Sien", "Ossef", 6, NULL),
       ("Zarayah", "Jordan", 7, NULL);
       
