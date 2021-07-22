const util = require('util');
const defaultConnection = require('./connection');

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
}

module.exports = DBHandler;