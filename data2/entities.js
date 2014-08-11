db.entities.drop();

db.entities.insert([
  {
    _id: ObjectId(),
    name: 'Employee',
    plural: 'Employees',
    collectionName: 'employees',
    screens: [
      {
        _id: ObjectId(),
        name: "General",
        source: "general",
        type: "Single",
        fields: [
          { _id: ObjectId(), label: "Id", type: "text", source: "displayId" },
          { _id: ObjectId(), label: "Forename", type: "text", source: "forename" },
          { _id: ObjectId(), label: "Surname", type: "text", source: "surname" },
          { _id: ObjectId(), label: "Date of Birth", type: "date", source: "dateOfBirth" },
          { _id: ObjectId(), label: "Marital Status", type: "select", source: "maritalStatus", referenceData: "Marital Status" },
          { _id: ObjectId(), label: "Nationality", type: "select", source: "nationality", referenceData: "Nationality" },
          { _id: ObjectId(), label: "Continuous Service Date", type: "date", source: "contService" }
        ],
        list: [
          { _id: ObjectId(), label: "Id", source: "displayId" },
          { _id: ObjectId(), label: "Name", source: "display" },
          { _id: ObjectId(), label: "Date of Birth", type: "date", source: "dateOfBirth" },
          { _id: ObjectId(), label: "Nationality", source: "nationality" }
        ]
      },
      {
        _id: ObjectId(),
        name: "Bank",
        source: "bank",
        type: "Single",
        fields: [
          { _id: ObjectId(), label: "Bank Name", type: "text", source: "bank.name" },
          { _id: ObjectId(), label: "Account Number", type: "text", source: "bank.accountNumber" },
          { _id: ObjectId(), label: "Sort Code", type: "text", source: "bank.sortCode" }
        ],
        list: [
          { _id: ObjectId(), label: "Name", source: "name.display" },
          { _id: ObjectId(), label: "Bank", source: "bank.name" },
          { _id: ObjectId(), label: "Account Number", source: "bank.accountNumber" },
          { _id: ObjectId(), label: "Sort Code", source: "bank.sortCode" }
        ]
      }
    ]
  },
  {
    _id: ObjectId(),
    name: 'Post',
    plural: 'Posts',
    collectionName: 'posts',
    screens: [
      {
        _id: ObjectId(),
        name: "Details",
        source: "details",
        type: "Single",
        fields: [
          { _id: ObjectId(), label: "Id", type: "text", source: "postId" },
          { _id: ObjectId(), label: "Title", type: "text", source: "title" }
        ],
        list: [
          { _id: ObjectId(), label: "Id", source: "postId" },
          { _id: ObjectId(), label: "Title", source: "title" }
        ]
      }
    ]
  }
]);