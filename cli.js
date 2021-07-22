const inquirer = require("inquirer");
const chalk = require('chalk');
const figlet = require('figlet');
require("console.table");

class CLI {
  constructor(db) {
    this.db = db;
  }

  start() {
    return this.db
      .init()
      .then(() => this.main_menu());
  }

  main_menu() {
    const banner_wall = chalk.bold.blueBright(
      "\n=====================================================================================\n"
    );
    const banner_msg = chalk.bold.yellow(figlet.textSync("Employee Tracker"));
    const app_author = chalk.bold.white(
      `\n\n                                                    Copyright @ 2021 by Jun Park\n`
    );

    console.log(banner_wall + banner_msg + app_author + banner_wall);
    // console.log(banner_msg);
    // console.log()
    inquirer.prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'app_begins',
        choices: [
          'View',
          'Add',
          'Update',
          'Remove',
          'Exit'
        ]
      }
    ]).then((answer) => {
      switch (answer.app_begins) {
        case "View":
          return this.view();
        case "Add":
          return this.add();
        case "Update":
          return this.update();
        case "Remove":
          return this.remove();
        default:
          return this.exit();
      }
    });
  }

  view() {

  }

  add() {
    inquirer.prompt([
      {
        type: 'list',
        message: 'Please select one of the options below',
        name: 'add_options',
        choices: [
          'Add Employee',
          'Add Role',
          'Add Department',
          'Back to Main Menu'
        ]
      }
    ]).then((answer) => {
      switch (answer.add_options) {
        case 'Add Employee':
          return addEmployee();
        case 'Add Role':
          return addRole();
        case 'Add Department':
          return addDepartment();
        default:
          return this.main_menu();
      }
    })
  }

  update() {

  }

  remove() {

  }

  exit() {
    return this.db.close_connection(() => process.exit(0));
  }

}

module.exports = CLI;
