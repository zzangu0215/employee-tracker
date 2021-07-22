function addEmployeePrompt() {

  const addEmployeeQuestions = [
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'employee_first',
      validate: answer => {
        if (answer) return true;
        else {
          console.log("\nPlease Enter the First name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'employee_last',
      validate: answer => {
        if (answer) return true;
        else {
          console.log("\nPlease Enter the Last name!");
          return false;
        }
      }
    },
    // {
    //   type: 'input',
    //   message: "What is the employee's role id?",
    //   name: 'employee_role',
    //   validate: answer => {
    //     if (answer) return true;
    //     else {
    //       console.log("\nPlease Enter the role!");
    //       return false;
    //     }
    //   }
    // },
    // {
    //   type: 'input',
    //   message: "Who is the employee's manager?",
    //   name: 'employee_manager',
    //   validate: answer => {
    //     if (answer) return true;
    //     else {
    //       console.log("\nPlease Enter the manager!");
    //       return false;
    //     }
    //   }
    // }
  ]

  return addEmployeeQuestions;

}

module.exports = addEmployeePrompt;