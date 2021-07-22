// import npm packages
require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

// import all the user prompts
const initialPrompt = require('./prompts/initial_prompt');
const initialPromptArray = initialPrompt();

const Add = require('./actions/Add');
// import all the actions based on the user's choice from the main menu
// const addEmployee = require('./actions/addEmployee');


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
        case 'View':
          viewActions(connection, appStarts);
          break;
        case 'Add':
          addActions(connection, appStarts);
          break;
        case 'Update':
          updateActions(connection, appStarts);
          break;
        case 'Remove':
          removeActions(connection, appStarts);
          break;
        default:
          connection.end(connection, appStarts);
      }
    })
}