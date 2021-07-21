// import npm packages
require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

// import all the user prompts
const initialPrompt = require('./prompts/initial_prompt');
const initialPromptArray = initialPrompt();

// import all the actions based on the user's choice from the main menu
const addEmployee = require('./actions/addEmployee');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connection Begins...");
  appStarts();
})

function appStarts() {
  const banner_wall = chalk.bold.blueBright('\n=====================================================================================\n');
  const banner_msg = chalk.bold.yellow(figlet.textSync('Employee Tracker'));
  const app_author = chalk.bold.white(`\n\n                                                    Copyright @ 2021 by Jun Park\n`);

  console.log(banner_wall + banner_msg + app_author + banner_wall);
  // console.log(banner_msg);
  // console.log()
  inquirer
    .prompt(initialPromptArray)
    .then(answer => {
      switch(answer.app_begins) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Departments':
          viewAllDepartmentS();
          break;
        case 'Add Employee':
          addEmployee(connection, appStarts);
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Update Employee Manager':
          updateEmployeeManager();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        case 'Remove Role':
          removeRole();
          break;
        case 'Remove Department':
          removeDepartment();
          break;
        default:
          connection.end();
      }
    })
}