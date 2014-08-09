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
        type: "Single",
        fields: [
          { _id: 1, label: "Id", type: "text", source: "displayId" },
          { _id: 2, label: "Forename", type: "text", source: "forename" },
          { _id: 3, label: "Surname", type: "text", source: "surname" },
          { _id: 4, label: "Date of Birth", type: "date", source: "dateOfBirth" },
          { _id: 5, label: "Marital Status", type: "select", source: "maritalStatus", referenceData: "Marital Status" },
          { _id: 6, label: "Nationality", type: "select", source: "nationality", referenceData: "Nationality" },
          { _id: 7, label: "Continuous Service Date", type: "date", source: "contService" }
        ],
        list: [
          { _id: 1, label: "Id", source: "displayId" },
          { _id: 2, label: "Name", source: "display" },
          { _id: 3, label: "Date of Birth", type: "date", source: "dateOfBirth" },
          { _id: 4, label: "Nationality", source: "nationality" }
        ]
      },
      {
        _id: 2,
        name: "Bank",
        type: "Single",
        fields: [
          { _id: 1, label: "Bank Name", type: "text", source: "bank.name" },
          { _id: 2, label: "Account Number", type: "text", source: "bank.accountNumber" },
          { _id: 3, label: "Sort Code", type: "text", source: "bank.sortCode" }
        ],
        list: [
          { _id: 1, label: "Name", source: "name.display" },
          { _id: 2, label: "Bank", source: "bank.name" },
          { _id: 3, label: "Account Number", source: "bank.accountNumber" },
          { _id: 4, label: "Sort Code", source: "bank.sortCode" }
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
        type: "Single",
        fields: [
          { _id: 1, label: "Id", type: "text", source: "postId" },
          { _id: 2, label: "Title", type: "text", source: "title" }
        ],
        list: [
          { _id: 1, label: "Id", source: "postId" },
          { _id: 2, label: "Title", source: "title" }
        ]
      }
    ]
  }
]);