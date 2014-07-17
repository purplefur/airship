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
  },
  {
    _id: 4,
    displayId: '300',
    name: {
      display: "Jayma Mays",
      forename: "Jayma",
      othernames: "Elizabeth",
      surname: "Mays"
    },
    dateOfBirth: ISODate("1981-11-09T00:00:00Z"),
    maritalStatus: "Single",
    nationality: "British",
    contService: ISODate("2013-07-10T00:00:00Z"),
    bank: {
      name: "Nationwide",
      accountNumber: "55409812",
      sortCode: "30-49-40"
    },
    address: {
      number: "103",
      street: "Telford Road",
      city: "Wargrave",
      county: "Berkshire",
      postCode: "RG4 7UB"
    },
    nok: {
      name: "Edward Mays",
      relation: "Parent",
      contactNumber: "07949 032008"
    },
    job: {
      title: "Logistics Manager",
      department: "Logistics",
      reportsTo: "Beryl Smith",
      salary: "£23.400",
      payBasis: "Annual"
    },
    medical: {
      doctor: "Dr Vincent Green",
      practice: "Cavendish Road Practice",
      registeredSince: ISODate("2014-01-08T00:00:00Z")
    }
  },
  {
    _id: 5,
    displayId: '61',
    name: {
      display: "Katrina Kaif",
      forename: "Katrina",
      surname: "Kaif"
    },
    dateOfBirth: ISODate("1977-05-13T00:00:00Z"),
    maritalStatus: "Single",
    nationality: "Spanish",
    contService: ISODate("2009-06-30T00:00:00Z"),
    bank: {
      name: "NatWest",
      accountNumber: "70603342",
      sortCode: "41-90-08"
    },
    address: {
      number: "49",
      street: "The Glades",
      city: "Reading",
      county: "Berkshire",
      postCode: "RG1 H07"
    },
    nok: {
      name: "Jose Kaif",
      relation: "Parent",
      contactNumber: "+32 3452 0889956"
    },
    job: {
      title: "Sotware Developer",
      department: "IT",
      reportsTo: "John Arthur",
      salary: "£37,000",
      payBasis: "Annual"
    },
    medical: {
      doctor: "Dr Mack",
      practice: "Cavendish Road Practice",
      registeredSince: ISODate("2010-03-12T00:00:00Z")
    }
  },
  {
    _id: 6,
    displayId: '187',
    name: {
      display: "Daryl Mitchell",
      forename: "Daryl",
      surname: "Mitchell"
    },
    dateOfBirth: ISODate("1968-11-02T00:00:00Z"),
    maritalStatus: "Divorced",
    nationality: "Irish",
    contService: ISODate("2008-12-04T00:00:00Z"),
    bank: {
      name: "Skipton Building Society",
      accountNumber: "55400231",
      sortCode: "87-03-21"
    },
    address: {
      number: "17A",
      street: "Windsor Court",
      city: "Carlisle",
      county: "Cumbria",
      postCode: "CL12 4RT"
    },
    nok: {
      name: "Ruby Regan",
      relation: "Daughter",
      contactNumber: "01422 870006"
    },
    job: {
      title: "Database Administrator",
      department: "IT",
      reportsTo: "John Arthur",
      salary: "£33,000",
      payBasis: "Annual"
    },
    medical: {
      doctor: "Graeme Robinson",
      practice: "Heathfield Surgery",
      phoneNumber: "01422 332900"
    }
  },
  {
    _id: 7,
    displayId: '202',
    name: {
      display: "Chris Pontius",
      forename: "Chris",
      othernames: "Daryl",
      surname: "Pontius"
    },
    dateOfBirth: ISODate("1974-03-12T00:00:00Z"),
    maritalStatus: "Single",
    nationality: "Italian",
    contService: ISODate("2011-10-14T00:00:00Z"),
    bank: {
      name: "HSBC",
      accountNumber: "40322110",
      sortCode: "20-09-43"
    },
    address: {
      number: "23",
      street: "The Rushes",
      city: "Garforth",
      county: "West Yorkshire",
      postCode: "LS39 5TR"
    },
    job: {
      title: "Sales Manager",
      department: "Sales",
      reportsTo: "Megan O'Reilly",
      salary: "£35,000",
      payBasis: "Annual"
    },
    medical: {
      doctor: "Dr Freshfields",
      practice: "Garforth Medical Practice",
      phoneNumber: "0113 4432220",
      registeredSince: ISODate("2013-09-09T00:00:00Z")
    }
  }
]);

//7 Chris Pontius
//8 Michelle Morgan
//9 Andrew James Allen
//10 Corin Redgrave

