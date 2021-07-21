function initialPrompt() {

  const allChoices = [
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'app_begins',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Update Employee Role',
        'Update Employee Manager',
        'Remove Employee',
        'Remove Role',
        'Remove Department',
        'Exit'
      ]
    }
  ]

  return allChoices;

}

module.exports = initialPrompt;