db.users.drop();
db.employees.drop();
db.screens.drop();

db.users.insert([
  { "firstName" : "Steve", "lastName" : "Patterson", "username" : "stevep", "salt" : "9dXOoWrsUeL8xWfrHJzBfVu0OcwvWKyltCcUpfdB+JcZJR0RGK1sT+fjuDREggns4RV9A3kHwImgU9lMQvg90BiKVV3/DL2DKq2U6KpnYQyaoaeKP3swsKXMuU7C8ms25tE6jUId2tfAfjBMv1hzF9da1uNmWc93tIdQCn7EmJw=", "hashed_pwd" : "ed69ce5d80c9600e0f7edf5d68f7ac7dac442730",  "roles" : [ "admin" ] }
]);

db.screens.insert([
  {
    _id: 1,
    name: "General",
    summary: [
      { label: "Id", value: "_id" },
      { label: "Name", value: "name.display" },
      { label: "Job Title", value: "jobTitle" }
    ],
    fields: [
      { label: "Id", type: "text", value: "_id" },
      { label: "Forename", type: "text", value: "name.forename" },
      { label: "Surname", type: "text", value: "name.surname" }
    ]
  },
  {
    _id: 2,
    name: "Bank",
    summary: [
      { label: "Name", value: "name.display" },
      { label: "Bank", value: "bank.name" },
      { label: "Account Number", value: "bank.accountNumber" }
    ],
    fields: [
      { label: "Employee", type: "text", value: "name.display" },
      { label: "Bank Name", type: "text", value: "bank.name" },
      { label: "Account Number", type: "text", value: "bank.accountNumber" }
    ]
  }
]);

db.employees.insert([
  { _id: 1, name: { display: "Darren Peacock", forename: "Darren", surname: "Peacock" }, title: "Mr", jobTitle: "Centre Half", bank: { name: 'Barclays', accountNumber: '05624481' } },
  { _id: 2, name: { display: "Lee Clark", forename: "Lee", surname: "Clark" }, title: "Mr", jobTitle: "Centre Midfield" },
  { _id: 3, name: { display: "Robert Lee", forename: "Robert", surname: "Lee" }, title: "Mr", jobTitle: "Centre Midfield" },
  { _id: 4, name: { display: "Jackie Milburn", forename: "Jackie", surname: "Milburn" }, title: "Mr", jobTitle: "Striker" },
  { _id: 5, name: { display: "Pavel Srnicek", forename: "Pavel", surname: "Srnicek" }, title: "Mr", jobTitle: "Goalkeeper" },
  { _id: 6, name: { display: "Les Ferdinand", forename: "Les", surname: "Ferdinand" }, title: "Mr", jobTitle: "Striker" },
  { _id: 7, name: { display: "John Gallacher", forename: "John", surname: "Gallacher" }, title: "Mr", jobTitle: "Left Winger" },
  { _id: 8, name: { display: "Steve Watson", forename: "Steve", surname: "Watson" }, title: "Mr", jobTitle: "Right Back" }
]);