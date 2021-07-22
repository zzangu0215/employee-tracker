const validator = require('validator');

const validate = {
  validateFirstName(str) {
    return str !== '' || 'Please Enter the First Name!';
  },
  validateLastName(str) {
    return str !== '' || 'Please Enter the Last Name!';
  },
  validateRole(str) {
    return str !== '' || 'Please Enter the Role!';
  },
  validateDepartment(str) {
    return str !== '' || 'Please Enter the Department!';
  },
  validateSalary(num) {
    if (validator.isDecimal(num)) return true;
    return 'Please Enter a Valid Salary!';
  },
  isSame(str1, str2) {
    if (str1 === str2) return true;
  }
};

module.exports = validate;