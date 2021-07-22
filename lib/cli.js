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

  view() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Please select one of the options below",
          name: "view_options",
          choices: [
            "View All Employees",
            "View Employees by Manager",
            "View All Roles",
            "View All Departments",
            "View the Total Utilized Budget of a Department",
            "Back to Main Menu",
          ],
        },
      ])
      .then((answer) => {
        switch (answer.view_options) {
          case "View All Employees":
            return this.viewAllEmployees();
          case "View Employees by Manager":
            return this.viewEmployeeByManager();
          case "View All Roles":
            return this.viewAllRoles();
          case "View All Departments":
            return this.viewAllDepartments();
          case "View the Total Utilized Budget of a Department":
            return this.viewAllDepartments();
          default:
            return this.main_menu();
        }
      });
  }

  viewAllEmployees() {
    this.db.view_all_employees().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n===============================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                       CURRENT EMPLOYEES                      \n`
      );
      const wall2 = chalk.bold.greenBright(
        "================================================================\n"
      );
      console.log(wall1 + msg);
      console.table(results);
      console.log(wall2);
      console.log(
        chalk.magenta.bold("                 Returned to Main Menu 🏠")
      );

      return this.main_menu();
    });
  }

  viewAllRoles() {
    this.db.view_all_roles().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n===================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n      CURRENT EMPLOYEE ROLES      \n`
      );
      const wall2 = chalk.bold.greenBright(
        "===================================\n"
      );
      console.log(wall1 + msg);
      console.table(results);
      console.log(wall2);
      console.log(
        chalk.magenta.bold("                 Returned to Main Menu 🏠")
      );

      return this.main_menu();
    });
  }

  viewAllDepartments() {
    this.db.view_all_departments().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n===================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n         ALL DEPARTMENTS         \n`
      );
      const wall2 = chalk.bold.greenBright(
        "===================================\n"
      );
      console.log(wall1 + msg);
      console.table(results);
      console.log(wall2);
      console.log(
        chalk.magenta.bold("                 Returned to Main Menu 🏠")
      );

      return this.main_menu();
    });
  }

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
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "employee_last",
          validate: validate.validateLastName,
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
                        chalk.magenta.bold(
                          "\nNew Employee Added Successfully ✔"
                        )
                      );
                      return this.viewAllEmployees();
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
            choices: [...departments, "Add Department", "Back to Main Menu"],
          },
        ])
        .then((answer) => {
          if (answer.department_option === "Add Department")
            return this.addDepartment();
          else if (answer.department_option === "Back to Main Menu")
            return this.main_menu();
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
          console.log(chalk.magenta.bold("\nNew Role Added Successfully ✔"));
          return this.viewAllRoles();
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
          console.log(
            chalk.magenta.bold("\nNew Department Added Successfully ✔")
          );
          return this.viewAllDepartments();
        });
      });
  }

  update() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Please select one of the options below",
          name: "update_options",
          choices: [
            "Update Employee Roles",
            "Update Employee Managers",
            "Back to Main Menu",
          ],
        },
      ])
      .then((answer) => {
        switch (answer.update_options) {
          case "Update Employee Roles":
            return this.updateEmployeeRoles();
          case "Update Employee Managers":
            return this.updateEmployeeManager();
          default:
            return this.main_menu();
        }
      });
  }

  updateEmployeeRoles() {
    this.db.get_employee_roles().then((results) => {
      const employees = [];
      results.forEach((employee) => {
        employees.push(`${employee.first_name} ${employee.last_name}`);
      });

      this.db.get_roles_list().then((results) => {
        const roles = [];
        results.forEach((role) => {
          roles.push(role.title);
        });

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which Employee Do You Want to Update his/her role?",
              name: "chosen_employee",
              choices: employees,
            },
            {
              type: "list",
              message:
                "Select a New Role for the Employee from the lists below.\nIf there is nothing to choose for your update, then select [Add Role]",
              name: "chosen_role",
              choices: [...roles, "Add Role", "Back to Main Menu"],
            },
          ])
          .then((answer) => {
            if (answer.chosen_role === "Add Role") return this.addRole_step1();
            if (answer.chosen_role === "Back to Main Menu") return this.main_menu();

            let employee_id, new_role_id;
            results.forEach((employee) => {
              if (
                answer.chosen_employee ===
                `${employee.first_name} ${employee.last_name}`
              )
                employee_id = employee.id;
            });
            results.forEach((role) => {
              if (answer.chosen_role === role.title) new_role_id = role.id;
            });

            this.db.update_employee_roles(new_role_id, employee_id).then(() => {
              console.log(
                chalk.magenta.bold("\nEmployee Role updated Successfully ✔")
              );
              return this.viewAllEmployees();
            });
          });
      });
    });
  }

  remove() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Please select one of the options below",
          name: "remove_options",
          choices: [
            "Remove Employee",
            "Remove Role",
            "Remove Department",
            "Back to Main Menu",
          ],
        },
      ])
      .then((answer) => {
        switch (answer.remove_options) {
          case "Remove Employee":
            return this.removeEmployee();
          case "Remove Role":
            return this.removeRole();
          case "Remove Department":
            return this.removeDepartment();
          default:
            return this.main_menu();
        }
      });
  }

  exit() {
    return this.db.close_connection(() => process.exit(0));
  }
}

module.exports = CLI;
