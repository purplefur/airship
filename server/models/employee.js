var mongoose = require('mongoose');

// EMPLOYEES
var employeeSchema = mongoose.Schema({
  _id: Number,
  displayId: String,
  name: {
    display: String,
    forename: String,
    othernames: String,
    surname: String
  },
  dateOfBirth: Date,
  maritalStatus: String,
  nationality: String,
  contService: Date,
  bank: {
    name: String,
    accountNumber: String,
    sortCode: String
  },
  address: {
    number: String,
    street: String,
    city: String,
    county: String,
    postCode: String
  },
  nok: {
    name: String,
    relation: String,
    contactNumber: String,
    alternativeNumber: String
  },
  job: {
    title: String,
    department: String,
    reportsTo: String,
    salary: String,
    payBasis: String
  },
  medical: {
    doctor: String,
    practice: String,
    phoneNumber: String,
    registeredSince: Date
  }
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

