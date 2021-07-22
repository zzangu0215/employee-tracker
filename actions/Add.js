const inquirer = require("inquirer");
const addOptions = require("../prompts/add_prompts");
const addOptionsArray = addOptions();

class Add {

  constructor(connection, appStarts) {
      this.connection = connection;
			this.appStarts = appStarts;
  }

  addEmployee() {
		// const answer = await inquirer.prompt(addOptionsArray);
		// const insert_query = 
		// `INSERT INTO employee (first_name, last_name, role_id, manager_id)
 		//  VALUES (?, ?, ?, ?)`;

		// const role_query = 
		// `SELECT id, title FROM role`;

		// const manager_query = 
		// `SELECT * FROM employee`;

		return inquirer.prompt([
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
			}
		])
		.then(answer => {
			const employee_name = [answer.employee_first, answer.employee_last];
			this.connection.query(
				`SELECT id, title FROM role`,
				(err, res) => {
					if (err) throw err;
					const roles = res.map(({title, id}) => ({}))
				}
			)
		})
	}

  async addRole() {
		const answer = await inquirer.prompt(addOptionsArray);
	}

  async addDepartment() {
		const answer = await inquirer.prompt(addOptionsArray);
	}
}

module.exports = Add;