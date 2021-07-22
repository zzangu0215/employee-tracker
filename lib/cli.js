const inquirer = require("inquirer");
const validate = require("../validation/validate");
const chalk = require("chalk");
const figlet = require("figlet");
require("console.table");

class CLI {
  constructor(db) {
    this.db = db;
  }

  start() {
    return this.db.init().then(() => this.main_menu());
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
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "app_begins",
          choices: ["View", "Add", "Update", "Remove", "Exit"],
        },
      ])
      .then((answer) => {
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

  view() {}

  add() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Please select one of the options below",
          name: "add_options",
          choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "Back to Main Menu",
          ],
        },
      ])
      .then((answer) => {
        switch (answer.add_options) {
          case "Add Employee":
            return this.addEmployee();
          case "Add Role":
            return this.addRole_step1();
          case "Add Department":
            return this.addDepartment();
          default:
            return this.main_menu();
        }
      });
  }

  addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "employee_first",
          validate: validate.validateFirstName,
          // validate: (answer) => {
          //   if (answer) return true;
          //   else {
          //     console.log("\nPlease Enter the First name!");
          //     return false;
          //   }
          // },
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "employee_last",
          validate: validate.validateLastName,
          // validate: (answer) => {
          //   if (answer) return true;
          //   else {
          //     console.log("\nPlease Enter the Last name!");
          //     return false;
          //   }
          // },
        },
      ])
      .then((answer) => {
        const employee = [answer.employee_first, answer.employee_last];
        this.db.get_roles_list().then((results) => {
          const roles = results.map(({ title, id }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                message: "What is the employee's role?",
                name: "employee_role",
                choices: roles,
              },
            ])
            .then((answer) => {
              employee.push(answer.employee_role);
              this.db.get_managers_list().then((results) => {
                const managers = results.map(
                  ({ first_name, last_name, id }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                  })
                );

                inquirer
                  .prompt([
                    {
                      type: "list",
                      message: "Who is the employee's manager?",
                      name: "employee_manager",
                      choices: managers,
                    },
                  ])
                  .then((answer) => {
                    employee.push(answer.employee_manager);
                    this.db.add_employee(employee).then(() => {
                      console.log(
                        chalk.cyan("\nNew Employee Added Successfully ✔")
                      );
                      return this.main_menu();
                    });
                  });
              });
            });
        });
      });
  }

  addRole_step1() {
    this.db.get_departments_list().then((results) => {
      const departments = [];
      results.forEach((item) => {
        departments.push(item.name);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message:
              "Please choose one of the departments below for your new role.\nIf there is no department you are looking for, then choose [Add Department]",
            name: "department_option",
            choices: [...departments, "Add Department"],
          },
        ])
        .then((answer) => {
          if (answer.department_option === "Add Department")
            return this.addDepartment();
          else return this.addRole_step2(results, answer);
        });
    });
  }

  addRole_step2(results, department) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Please provide the name of the new role:",
          name: "new_role",
          validate: validate.validateRole,
        },
        {
          type: "input",
          message: "Please provide the salary of the new role:",
          name: "role_salary",
          validate: validate.validateSalary,
        },
      ])
      .then((answer) => {
        let department_id;
        results.forEach((item) => {
          if (department.department_option === item.name)
            department_id = item.id;
        });

        const role = [answer.new_role, answer.role_salary, department_id];
        this.db.add_role(role).then(() => {
          console.log(chalk.cyan("\nNew Role Added Successfully ✔"));
          return this.main_menu();
        });
      });
  }

  addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Please provide the name of the new department:",
          name: "new_department",
          validate: validate.validateDepartment,
        },
      ])
      .then((answer) => {
        this.db.add_department(answer.new_department).then(() => {
          console.log(chalk.cyan("\nNew Department Added Successfully ✔"));
          return this.main_menu();
        });
      });
  }

  update() {}

  remove() {}

  exit() {
    return this.db.close_connection(() => process.exit(0));
  }
}

module.exports = CLI;
