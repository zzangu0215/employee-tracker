const inquirer = require('inquirer');
const addEmployeePrompt = require('../prompts/addEmployee_prompt');

const addEmployeePromptArray = addEmployeePrompt();

const query = 
`INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES (?, ?, ?, ?)`;

function addEmployee(connection, appStarts) {
  inquirer
    .prompt(addEmployeePromptArray)
    .then(answer => {
      connection.query(
        query,
        [answer.employee_first, answer.employee_last, answer.role, answer.manager],
        (err, res) => {
          console.log("Employee Added Successfully!");
          appStarts();
        }
      )
    })

}

module.exports = addEmployee;