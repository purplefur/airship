db.employees.drop();

db.employees.insert([
  {
    _id: 1,
    displayId: 'E1',
    name: {
      display: "Darren Peacock",
      forename: "Darren",
      surname: "Peacock"
    },
    title: "Mr",
    jobTitle: "Centre Half",
    bank: {
      name: 'Barclays',
      accountNumber: '05624481'
    }
  },
  { _id: 2,
    displayId: 'E2',
    name: {
      display: "Lee Clark",
      forename: "Lee",
      surname: "Clark"
    },
    title: "Mr",
    jobTitle: "Centre Midfield"
  },
  {
    _id: 3,
    displayId: 'E3',
    name: {
      display: "Robert Lee",
      forename: "Robert",
      surname: "Lee"
    },
    title: "Mr",
    jobTitle: "Centre Midfield"
  },
  {
    _id: 4,
    displayId: 'E4',
    name: {
      display: "Jackie Milburn",
      forename: "Jackie",
      surname: "Milburn"
    },
    title: "Mr",
    jobTitle: "Striker" }
]);