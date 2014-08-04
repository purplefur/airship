db.entities.drop();

db.entities.insert([
  {
    _id: 1,
    name: 'Employee',
    plural: 'Employees',
    collectionName: 'employees',
    screens: [
      {
        _id: 1,
        name: "General",
        fields: [
          { label: "Id", type: "text", source: "displayId" },
          { label: "Forename", type: "text", source: "forename" },
          { label: "Surname", type: "text", source: "surname" },
          { label: "Date of Birth", type: "date", source: "dateOfBirth" },
          { label: "Marital Status", type: "select", source: "maritalStatus", referenceData: "Marital Status" },
          { label: "Nationality", type: "select", source: "nationality", referenceData: "Nationality" },
          { label: "Continuous Service Date", type: "date", source: "contService" }
        ],
        list: [
          { label: "Id", source: "displayId" },
          { label: "Name", source: "display" },
          { label: "Date of Birth", type: "date", source: "dateOfBirth" },
          { label: "Nationality", source: "nationality" }
        ]
      },
      {
        _id: 2,
        name: "Bank",
        fields: [
          { label: "Bank Name", type: "text", source: "bank.name" },
          { label: "Account Number", type: "text", source: "bank.accountNumber" },
          { label: "Sort Code", type: "text", source: "bank.sortCode" }
        ],
        list: [
          { label: "Name", source: "name.display" },
          { label: "Bank", source: "bank.name" },
          { label: "Account Number", source: "bank.accountNumber" },
          { label: "Sort Code", source: "bank.sortCode" }
        ]
      }
    ]
  },
  {
    _id: 2,
    name: 'Post',
    plural: 'Posts',
    collectionName: 'posts',
    screens: [
      {
        _id: 1,
        name: "Details",
        fields: [
          { label: "Id", type: "text", source: "postId" },
          { label: "Title", type: "text", source: "title" }
        ],
        list: [
          { label: "Id", source: "postId" },
          { label: "Title", source: "title" }
        ]
      }
    ]
  }
]);