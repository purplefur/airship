db.users.drop();
db.employees.drop();
db.screens.drop();

db.users.insert([
  { "firstName" : "Steve", "lastName" : "Patterson", "username" : "stevep", "salt" : "9dXOoWrsUeL8xWfrHJzBfVu0OcwvWKyltCcUpfdB+JcZJR0RGK1sT+fjuDREggns4RV9A3kHwImgU9lMQvg90BiKVV3/DL2DKq2U6KpnYQyaoaeKP3swsKXMuU7C8ms25tE6jUId2tfAfjBMv1hzF9da1uNmWc93tIdQCn7EmJw=", "hashed_pwd" : "ed69ce5d80c9600e0f7edf5d68f7ac7dac442730", "roles" : [ "admin" ], "contexts": [] }
]);

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
      { label: "Date of Birth", type: "date", source: "dateOfBirth" }
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

db.employees.insert([
  { _id: 1, displayId: 'E1', name: { display: "Darren Peacock", forename: "Darren", surname: "Peacock" }, title: "Mr", jobTitle: "Centre Half", bank: { name: 'Barclays', accountNumber: '05624481' } },
  { _id: 2, displayId: 'E2', name: { display: "Lee Clark", forename: "Lee", surname: "Clark" }, title: "Mr", jobTitle: "Centre Midfield" },
  { _id: 3, displayId: 'E3', name: { display: "Robert Lee", forename: "Robert", surname: "Lee" }, title: "Mr", jobTitle: "Centre Midfield" },
  { _id: 4, displayId: 'E4', name: { display: "Jackie Milburn", forename: "Jackie", surname: "Milburn" }, title: "Mr", jobTitle: "Striker" },
  { _id: 5, displayId: 'E5', name: { display: "Pavel Srnicek", forename: "Pavel", surname: "Srnicek" }, title: "Mr", jobTitle: "Goalkeeper" },
  { _id: 6, displayId: 'E6', name: { display: "Les Ferdinand", forename: "Les", surname: "Ferdinand" }, title: "Mr", jobTitle: "Striker" },
  { _id: 7, displayId: 'E7', name: { display: "John Gallacher", forename: "John", surname: "Gallacher" }, title: "Mr", jobTitle: "Left Winger" },
  { _id: 8, displayId: 'E8', name: { display: "Steve Watson", forename: "Steve", surname: "Watson" }, title: "Mr", jobTitle: "Right Back" }
]);