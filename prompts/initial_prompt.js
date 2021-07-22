function initialPrompt() {

  const allChoices = [
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
  ]

  return allChoices;
}

module.exports = initialPrompt;