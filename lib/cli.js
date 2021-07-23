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
    const banner_wall = chalk.bold.blueBright(
      "\n=====================================================================================\n"
    );
    const banner_msg = chalk.bold.yellow(figlet.textSync("Employee Tracker"));
    const app_author = chalk.bold.white(
      `\n\n                                                     Copyright @ 2021 by Jun Park\n`
    );

    console.log(banner_wall + banner_msg + app_author + banner_wall);
    return this.db.init().then(() => this.main_menu());
  }

  main_menu() {
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n              MAIN MENU            \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

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
            "View Employees by Role",
            "View Employees by Department",
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
          case "View Employees by Role":
            return this.viewEmployeeByRole();
          case "View Employees by Department":
            return this.viewEmployeeByDepartment();
          case "View All Roles":
            return this.viewAllRoles();
          case "View All Departments":
            return this.viewAllDepartments();
          case "View the Total Utilized Budget of a Department":
            return this.viewTotalBudgets();
          default:
            return this.main_menu();
        }
      });
  }

  viewAllEmployees() {
    this.db.view_all_employees().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n=====================================================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                                   CURRENT EMPLOYEES                                 \n`
      );
      const wall2 = chalk.bold.greenBright(
        "=====================================================================================\n"
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

  viewEmployeeByManager() {
    this.db.view_employees_by_manager().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n=====================================================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                              CURRENT EMPLOYEES BY MANAGER                           \n`
      );
      const wall2 = chalk.bold.greenBright(
        "=====================================================================================\n"
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

  viewEmployeeByRole() {
    this.db.view_employees_by_role().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n=====================================================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                               CURRENT EMPLOYEES BY ROLE                             \n`
      );
      const wall2 = chalk.bold.greenBright(
        "=====================================================================================\n"
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

  viewEmployeeByDepartment() {
    this.db.view_employees_by_department().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n=====================================================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                             CURRENT EMPLOYEES BY DEPARTMENT                         \n`
      );
      const wall2 = chalk.bold.greenBright(
        "=====================================================================================\n"
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

  viewTotalBudgets() {
    this.db.view_total_budgets().then((results) => {
      const wall1 = chalk.bold.greenBright(
        "\n=====================================================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                         TOTAL UTILIZED BUDGETS OF DEPARTMENTS                       \n`
      );
      const wall2 = chalk.bold.greenBright(
        "=====================================================================================\n"
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
        "\n=====================================================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                                CURRENT EMPLOYEE ROLES                               \n`
      );
      const wall2 = chalk.bold.greenBright(
        "=====================================================================================\n"
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
        "\n=====================================================================================\n"
      );
      const msg = chalk.bold.bgYellow.black(
        `\n                                    ALL DEPARTMENTS                                  \n`
      );
      const wall2 = chalk.bold.greenBright(
        "=====================================================================================\n"
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
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n            ADD EMPLOYEE           \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);


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
        this.db.get_roles_list().then((roleRows) => {
          const roles = roleRows.map(({ title, id }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                message: "What is the employee's role?\n If there is no role you are looking for, select [Add Role] to add more role.",
                name: "employee_role",
                choices: [...roles, "Add Role", "Back to Main Menu"],
              },
            ])
            .then((answer) => {
              if (answer.employee_role === "Add Role")
                return this.addRole_step1();
              if (answer.employee_role === "Back to Main Menu")
                return this.main_menu();

              employee.push(answer.employee_role);
              this.db.get_employees_list().then((managerRows) => {
                const managers = managerRows.map(
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
                          "\n        New Employee Added Successfully ✔"
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
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n              ADD ROLE             \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

    this.db.get_departments_list().then((departmentRows) => {
      const departments = [];
      departmentRows.forEach((item) => {
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
          else return this.addRole_step2(departmentRows, answer);
        });
    });
  }

  addRole_step2(departmentRows, department) {
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
        departmentRows.forEach((item) => {
          if (department.department_option === item.name)
            department_id = item.id;
        });

        const role = [answer.new_role, answer.role_salary, department_id];
        this.db.add_role(role).then(() => {
          console.log(
            chalk.magenta.bold("\n        New Role Added Successfully ✔")
          );
          return this.viewAllRoles();
        });
      });
  }

  addDepartment() {
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n           ADD DEPARTMENT          \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

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
            chalk.magenta.bold("\n        New Department Added Successfully ✔")
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
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n        UPDATE EMPLOYEE ROLE       \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

    this.db.get_employee_roles().then((employeeRows) => {
      const employees = [];
      employeeRows.forEach((employee) => {
        employees.push(`${employee.first_name} ${employee.last_name}`);
      });

      this.db.get_roles_list().then((roleRows) => {
        const roles = [];
        roleRows.forEach((role) => {
          roles.push(role.title);
        });

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which Employee Do You Want to Update his/her role?",
              name: "chosen_employee",
              choices: [...employees, "Back to Main Menu"],
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
            if (answer.chosen_employee === "Back to Main Menu")
              return this.main_menu();
            if (answer.chosen_role === "Back to Main Menu")
              return this.main_menu();

            let employee_id, new_role_id;
            employeeRows.forEach((employee) => {
              if (
                answer.chosen_employee ==
                `${employee.first_name} ${employee.last_name}`
              ) {
                employee_id = employee.id;
              }
            });

            roleRows.forEach((role) => {
              if (answer.chosen_role == role.title) new_role_id = role.id;
            });

            this.db.update_employee_roles(new_role_id, employee_id).then(() => {
              console.log(
                chalk.magenta.bold(
                  "\n        Employee Role Updated Successfully ✔"
                )
              );
              return this.viewEmployeeByRole();
            });
          });
      });
    });
  }

  updateEmployeeManager() {
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n      UPDATE EMPLOYEE MANAGER      \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

    this.db.get_employee_manager().then((employeeRows) => {
      const employees = [];
      employeeRows.forEach((employee) => {
        employees.push(`${employee.first_name} ${employee.last_name}`);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which Employee Do You Want to Update his/her manager?",
            name: "chosen_employee2",
            choices: [...employees, "Back to Main Menu"],
          },
          {
            type: "list",
            message: "Select a manager from the list below.",
            name: "chosen_manager",
            choices: [...employees, "Back to Main Menu"],
          },
        ])
        .then((answer) => {
          if (answer.chosen_employee2 === "Back to Main Menu")
            return this.main_menu();
          if (answer.chosen_manager === "Back to Main Menu")
            return this.main_menu();

          let employee_id, manager_id;
          employeeRows.forEach((employee) => {
            if (
              answer.chosen_employee2 ==
              `${employee.first_name} ${employee.last_name}`
            ) {
              employee_id = employee.id;
            }

            if (
              answer.chosen_manager ==
              `${employee.first_name} ${employee.last_name}`
            ) {
              manager_id = employee.id;
            }
          });

          if (validate.isSame(answer.chosen_employee2, answer.chosen_manager)) {
            console.log(
              chalk.red.bold(
                "\nEmployee and Manager cannot be the same! Back to Main Menu...\n"
              )
            );
            return this.main_menu();
          } else {
            this.db
              .update_employee_manager(manager_id, employee_id)
              .then(() => {
                console.log(
                  chalk.magenta.bold(
                    "\n        Employee Manager Updated Successfully ✔"
                  )
                );
                return this.viewEmployeeByManager();
              });
          }
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

  removeEmployee() {
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n           REMOVE EMPLOYEE         \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

    this.db.get_employees_list().then((employeeRows) => {
      const employees = [];
      employeeRows.forEach((employee) => {
        employees.push(`${employee.first_name} ${employee.last_name}`);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Please choose one of the employees you want to remove.",
            name: "chosen_delete_employee",
            choices: [...employees, "Back to Main Menu"],
          },
        ])
        .then((answer) => {
          if (answer.chosen_delete_employee === "Back to Main Menu")
            return this.main_menu();

          let employee_id;

          employeeRows.forEach((employee) => {
            if (
              answer.chosen_delete_employee ==
              `${employee.first_name} ${employee.last_name}`
            ) {
              employee_id = employee.id;
            }
          });

          this.db.delete_employee(employee_id).then(() => {
            console.log(
              chalk.magenta.bold(
                `\n        Employee "${answer.chosen_delete_employee}" Removed Successfully ✔`
              )
            );
            return this.viewAllEmployees();
          });
        });
    });
  }

  removeRole() {
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n             REMOVE ROLE           \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

    this.db.get_roles_list().then((roleRows) => {
      const roles = [];
      roleRows.forEach((role) => {
        roles.push(role.title);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Please choose one of the roles you want to remove.",
            name: "chosen_delete_role",
            choices: [...roles, "Back to Main Menu"],
          },
        ])
        .then((answer) => {
          if (answer.chosen_delete_role === "Back to Main Menu")
            return this.main_menu();

          let role_id;

          roleRows.forEach((role) => {
            if (answer.chosen_delete_role === role.title) {
              role_id = role.id;
            }
          });

          this.db.delete_role(role_id).then(() => {
            console.log(
              chalk.magenta.bold(
                `\n        Role "${answer.chosen_delete_role}" Removed Successfully ✔`
              )
            );
            return this.viewAllRoles();
          });
        });
    });
  }

  removeDepartment() {
    const wall1 = chalk.bold.greenBright(
      "\n==================================="
    );
    const msg = chalk.bold.bgWhite.black(
      `\n         REMOVE DEPARTMENT         \n`
    );
    const wall2 = chalk.bold.greenBright(
      "===================================\n"
    );
    console.log(wall1 + msg + wall2);

    this.db.get_departments_list().then((departmentRows) => {
      const departments = [];
      departmentRows.forEach((department) => {
        departments.push(department.name);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Please choose one of the departments you want to remove.",
            name: "chosen_delete_department",
            choices: [...departments, "Back to Main Menu"],
          },
        ])
        .then((answer) => {
          if (answer.chosen_delete_department === "Back to Main Menu")
            return this.main_menu();

          let department_id;

          departmentRows.forEach((department) => {
            if (answer.chosen_delete_department === department.name) {
              department_id = department.id;
            }
          });

          this.db.delete_department(department_id).then(() => {
            console.log(
              chalk.magenta.bold(
                `\n        Department "${answer.chosen_delete_department}" Removed Successfully ✔`
              )
            );
            return this.viewAllDepartments();
          });
        });
    });
  }

  exit() {
    console.log(chalk.blue.bold("\nGood Bye. Have a nice day!\n"));
    return this.db.close_connection(() => process.exit(0));
  }
}

module.exports = CLI;
