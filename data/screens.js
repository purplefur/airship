db.screens.drop();

db.screens.insert([
  {
    _id: 1,
    name: "General",
    multiple: [
      { label: "Id", source: "displayId" },
      { label: "Name", source: "name.display" },
      { label: "Job Title", source: "jobTitle" }
    ],
    single: [
      { label: "Id", type: "text", source: "displayId" },
      { label: "Forename", type: "text", source: "name.forename" },
      { label: "Surname", type: "text", source: "name.surname" },
      { label: "Fire Warden", type: "checkbox", source: "fireWarden" },
      { label: "Date of Birth", type: "date", source: "dateOfBirth" },
      { label: "Marital Status", type: "select", source: "maritalStatus", referenceData: "Marital Status" }
    ]
  },
  {
    _id: 2,
    name: "Bank",
    multiple: [
      { label: "Name", source: "name.display" },
      { label: "Bank", source: "bank.name" },
      { label: "Account Number", source: "bank.accountNumber" }
    ],
    single: [
      { label: "Employee", type: "text", source: "name.display" },
      { label: "Bank Name", type: "text", source: "bank.name" },
      { label: "Account Number", type: "text", source: "bank.accountNumber" }
    ]
  }
]);

