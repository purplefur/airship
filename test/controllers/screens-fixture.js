exports.screens = [
  {
    _id: 1,
    name: 'General',
    multiple: [
      { label: "Id", source: "_id", type: "text" },
      { label: "Name", source: "name.display", type: "text" },
      { label: "Nationality", source: "nationality", type: "text" }
    ],
    single: [
      { label: "Id", type: "text", source: "_id" },
      { label: "Forename", type: "text", source: "name.forename" }
    ]
  },
  {
    _id: 2,
    name: 'Emergency Contacts',
    multiple: [
      {
        label: 'Contact'
      }
    ]
  }
];

// User to authenticate is pre-created with 1,2 in it's context
exports.employees = [
  {
    _id: 1,
    name: {
      display: 'Bob Hope',
      forename: 'Bob',
      surname: 'Hope'
    },
    nationality: 'Irish'
  },
  {
    _id: 2,
    name: {
      display: 'No Hope',
      forename: 'No',
      surname: 'Hope'
    }
  }
];