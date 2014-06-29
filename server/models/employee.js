var mongoose = require('mongoose');

// EMPLOYEES
var employeeSchema = mongoose.Schema({
  _id: Number,
  displayId: String,
  name: {
    display: String,
    forename: String,
    surname: String
  },
  bank: {
    name: String,
    accountNumber: String
  },
  title: String,
  jobTitle: String,
  fireWarden: Boolean
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

