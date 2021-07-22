const inquirer = require("inquirer");
const chalk = require('chalk');
const figlet = require('figlet');
require("console.table");

class CLI {
  constructor(db) {
    this.db = db;
  }

  exit() {
    return this.db.close_connection(() => process.exit(0));
  }

  start() {
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
}

module.exports = CLI;
