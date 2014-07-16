db.employees.drop();

db.employees.insert([
  {
    _id: 1,
    displayId: '320',
    name: {
      display: "Will Ferrell",
      forename: "Will",
      surname: "Ferrell"
    },
    dateOfBirth: ISODate("1965-04-12T00:00:00Z"),
    maritalStatus: "Married",
    nationality: "Irish",
    contService: ISODate("2007-05-03T00:00:00Z"),
    bank: {
      name: "Barclays",
      accountNumber: "32005423",
      sortCode: "54-32-01"
    },
    address: {
      number: "65",
      street: "Great Love Street",
      city: "Jarrow",
      county: "Tyne & Wear",
      postCode: "NE43 3RE"
    },
    nok: {
      name: "Brenda Ferrell",
      relation: "Parent",
      contactNumber: "01233 545334"
    },
    job: {
      title: "Head of Accounting",
      department: "Accounts",
      reportsTo: "Geoffrey St John",
      salary: "£89,500",
      payBasis: "Annual"
    },
    medical: {
      doctor: "Dr. Brown",
      practice: "Jarrow Surgery",
      phoneNumber: "0191 4333420",
      registeredSince: ISODate("2013-03-02T00:00:00Z")
    }
  },
  {
    _id: 2,
    displayId: '79',
    name: {
      display: "Corey Feldman",
      forename: "Corey",
      surname: "Feldman"
    },
    dateOfBirth: ISODate("1971-10-30T00:00:00Z"),
    maritalStatus: "Single",
    nationality: "French",
    contService: ISODate("2005-01-06T00:00:00Z"),
    bank: {
      name: "HSBC",
      accountNumber: "00434378",
      sortCode: "28-45-20"
    },
    address: {
      number: "3",
      street: "Kexby Avenue",
      city: "Prudhoe",
      county: "Tyne & Wear",
      postCode: "NE4 8TY"
    },
    nok: {
      name: "Janet Jones",
      relation: "Daughter",
      contactNumber: "07811 342005"
    },
    job: {
      title: "Machine Engineer",
      department: "Manufacturing",
      reportsTo: "Fred Barnes",
      salary: "£34.560",
      payBasis: "Annual"
    },
    medical: {
      doctor: "Dr Henry Smith",
      practice: "Sunshine Practice",
      phoneNumber: "0191 4332002"
    }
  },
  {
    _id: 3,
    displayId: '402',
    name: {
      display: "Phoebe Cates",
      forename: "Phoebe",
      surname: "Cates"
    },
    dateOfBirth: ISODate("1976-04-11T00:00:00Z"),
    maritalStatus: "Married",
    nationality: "British",
    contService: ISODate("2010-03-22T00:00:00Z"),
    bank: {
      name: "HSBC",
      accountNumber: "10103342",
      sortCode: "28-42-56"
    },
    address: {
      number: "33",
      street: "Newbury Court",
      city: "Oadby",
      county: "Leicestershire",
      postCode: "LE7 8UY"
    },
    nok: {
      name: "Norman Trewick",
      relation: "Grandparent",
      contactNumber: "07843 554002",
      alternativeNumber: "0114 5540331"
    },
    job: {
      title: "Administrative Assistant",
      department: "Logistics",
      reportsTo: "Beryl Smith",
      salary: "£11.43",
      payBasis: "Hourly"
    },
    medical: {
      doctor: "Dr French",
      practice: "Hugh Road Surgery"
    }
  }
]);

//3 Phoebe Cates
//4 Jayma Mays
//5 Katrina Kaif
//6 Daryl Mitchell
//7 Chris Pontius
//8 Michelle Morgan
//9 Andrew James Allen
//10 Corin Redgrave

