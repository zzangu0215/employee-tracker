const util = require('util');
const defaultConnection = require('../config/connection');

class DBHandler {

  constructor(connection = defaultConnection) {
    this.connection = connection;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) {
          return reject(error);
        }
        this.connection.query = util.promisify(this.connection.query);
        resolve();
      });
    });
  }

  close_connection(callback) {
    return this.connection.end(callback);
  }

  get_roles_list() {
    const query = `SELECT id, title FROM role`;
    return this.connection.query(query);
  }

  get_managers_list() {
    const query = `SELECT * FROM employee`;
    return this.connection.query(query);
  }

  get_departments_list() {
    const query = `SELECT * FROM department`;
    return this.connection.query(query);
  }

  get_employee_roles() {
    const query = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
    FROM employee, role, department
    WHERE employee.role_id = role.id AND role.department_id = department.id`;
    return this.connection.query(query);
  }

  get_employee_manager() {
    const query = 
    `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
    FROM employee`;
    return this.connection.query(query);
  }

  add_employee(employee) {
    const query = 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    return this.connection.query(query, employee);
  }

  add_role(role) {
    const query = 
    `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`;
    return this.connection.query(query, role);
  }

  add_department(department) {
    const query = 
    `INSERT INTO department (name)
    VALUES (?)`;
    return this.connection.query(query, department);
  }

  view_all_employees() {
    const query = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, 
    department.name AS "department", role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ORDER BY employee.id ASC`;
    return this.connection.query(query);
  }

  view_employees_by_manager() {
    const query = 
    `SELECT employee.id, employee.first_name, employee.last_name, manager.id AS manager_id, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee employee
    LEFT JOIN employee manager 
    ON employee.manager_id = manager.id `;
    return this.connection.query(query);
  }

  view_employees_by_role() {
    const query = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title AS position 
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id`;
    return this.connection.query(query);
  }

  view_employees_by_department() {
    const query = 
    `SELECT employee.id, employee.first_name, employee.last_name, manager.id AS manager_id, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee employee
    LEFT JOIN employee manager 
    ON employee.manager_id = manager.id `;
    return this.connection.query(query);
  }

  view_all_roles() {
    const query = 
    `SELECT role.id, role.title AS position, department.name AS department, role.salary AS salary, 
    COUNT (employee.role_id) AS "Total # of Employees"
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee ON employee.role_id = role.id
    GROUP BY role.id
    ORDER BY role.id ASC`;
    return this.connection.query(query);
  }

  view_all_departments() {
    const query = 
    `SELECT department.id AS id, department.name AS department, COUNT (role.department_id) AS "Total # of Roles"
    FROM department
    LEFT JOIN role ON role.department_id = department.id
    GROUP BY department.id
    ORDER BY department.id ASC`;
    return this.connection.query(query);
  }

  update_employee_roles(new_role_id, employee_id) {
    const query = 
    `UPDATE employee
    SET employee.role_id = ?
    WHERE employee.id = ?`;
    return this.connection.query(query, [new_role_id, employee_id]);
  }

  update_employee_manager(manager_id, employee_id) {
    const query = 
    `UPDATE employee 
    SET employee.manager_id = ? 
    WHERE employee.id = ?`;
    return this.connection.query(query, [manager_id, employee_id]);
  }
}

module.exports = DBHandler;
