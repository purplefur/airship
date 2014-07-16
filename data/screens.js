db.screens.drop();

db.screens.insert([
  {
    _id: 1,
    name: "General",
    multiple: [
      { label: "Id", source: "displayId" },
      { label: "Name", source: "name.display" },
      { label: "Date of Birth", type: "date", source: "dateOfBirth" },
      { label: "Nationality", source: "nationality" },
    ],
    single: [
      { label: "Id", type: "text", source: "displayId" },
      { label: "Forename", type: "text", source: "name.forename" },
      { label: "Other Names", type: "text", source: "name.othernames" },
      { label: "Surname", type: "text", source: "name.surname" },
      { label: "Date of Birth", type: "date", source: "dateOfBirth" },
      { label: "Marital Status", type: "select", source: "maritalStatus", referenceData: "Marital Status" },
      { label: "Nationality", type: "select", source: "nationality", referenceData: "Nationality" },
      { label: "Continuous Service Date", type: "date", source: "contService" }
    ]
  },
  {
    _id: 2,
    name: "Bank",
    multiple: [
      { label: "Name", source: "name.display" },
      { label: "Bank", source: "bank.name" },
      { label: "Account Number", source: "bank.accountNumber" },
      { label: "Sort Code", source: "bank.sortCode" }
    ],
    single: [
      { label: "Bank Name", type: "text", source: "bank.name" },
      { label: "Account Number", type: "text", source: "bank.accountNumber" },
      { label: "Sort Code", type: "text", source: "bank.sortCode" }
    ]
  },
  {
    _id: 3,
    name: "Home Address",
    multiple: [
      { label: "Name", source: "name.display" },
      { label: "House Number", source: "address.number" },
      { label: "Street", source: "address.street" },
      { label: "City", source: "address.city" }
    ],
    single: [
      { label: "House Number", type: "text", source: "address.number" },
      { label: "Street", type: "text", source: "address.street" },
      { label: "City", type: "text", source: "address.city" },
      { label: "County", type: "select", source: "address.county", referenceData: "County" },
      { label: "Post Code", type: "text", source: "address.postCode" }
    ]
  },
  {
    _id: 4,
    name: "Next of Kin",
    multiple: [
      { label: "Name", source: "name.display" },
      { label: "Contact", source: "nok.name" },
      { label: "Relation", source: "nok.relation" }
    ],
    single: [
      { label: "Name", type: "text", source: "nok.name" },
      { label: "Relation", type: "select", source: "nok.relation", referenceData: "Relation" },
      { label: "Contact Number", type: "text", source: "nok.contactNumber" },
      { label: "Alternative Number", type: "text", source: "nok.alternativeNumber" }
    ]
  },
  {
    _id: 5,
    name: "Current Post",
    multiple: [
      { label: "Name", source: "name.display" },
      { label: "Job Title", source: "job.title" },
      { label: "Department", source: "job.department" },
      { label: "Reports To", source: "job.reportsTo" }
    ],
    single: [
      { label: "Job Title", type: "text", source: "job.title" },
      { label: "Department", type: "select", source: "job.department", referenceData: "Department" },
      { label: "Reports To", type: "text", source: "job.reportsTo" },
      { label: "Basic Salary", type: "text", source: "job.salary" },
      { label: "Pay Basis", type: "select", source: "job.payBasis", referenceData: "Pay Basis" }
    ]
  },
  {
    _id: 6,
    name: "Medical",
    multiple: [
      { label: "Name", source: "name.display" },
      { label: "Doctor", source: "medical.doctor" },
      { label: "Practice Name", source: "medical.practice" },
      { label: "Phone Number", source: "medical.phoneNumber" }
    ],
    single: [
      { label: "Doctor", type: "text", source: "medical.doctor" },
      { label: "Practice Name", type: "text", source: "medical.practice" },
      { label: "Phone Number", type: "text", source: "medical.phoneNumber" },
      { label: "Registered Since", type: "date", source: "medical.registeredSince" }
    ]
  }
]);

