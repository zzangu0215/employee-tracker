const inquirer = require('inquirer');
const addEmployeePrompt = require('../prompts/addEmployee_prompt');

const addEmployeePromptArray = addEmployeePrompt();

const insert_query = 
`INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES (?, ?, ?, ?)`;

const role_query = 
`SELECT id, title FROM role`;

const manager_query = 
`SELECT * FROM employee`


function addEmployee(connection, appStarts) {
  inquirer
    .prompt(addEmployeePromptArray)
    .then(answer => {
      
    })


    // .then(answer => {
    //   connection.query(
    //     insert_query,
    //     [answer.employee_first, answer.employee_last, answer.role, answer.manager],
    //     (err, res) => {
    //       console.log("Employee Added Successfully!");
    //       appStarts();
    //     }
    //   )
    // })

}

module.exports = addEmployee;