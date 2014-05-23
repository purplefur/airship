var mongoose = require('mongoose');

// EMPLOYEES
var employeeSchema = mongoose.Schema({
  _id: Number,
  name: {
    display: String,
    forename: String,
    surname: String
  },
  title: String,
  jobTitle: String
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

