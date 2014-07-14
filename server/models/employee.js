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
  dateOfBirth: Date,
  bank: {
    name: String,
    accountNumber: String
  },
  title: String,
  jobTitle: String,
  fireWarden: Boolean,
  maritalStatus: String
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

