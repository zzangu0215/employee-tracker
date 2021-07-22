function addOptions() {
  const options = [
    {
      type: "list",
      message: "Select one of the choices below.",
      name: "add_option",
      choices: ["Add Employee", "Add Role", "Add Department", "Go Back"],
    }
  ];

  return options;
}

module.exports = addOptions;
