db.referenceData.drop();

db.referenceData.insert([
  {
    name: "Marital Status",
    type: "text",
    data: [
      { label: "Divorced", value: "Divorced" },
      { label: "Married", value: "Married" },
      { label: "Single", value: "Single" },
      { label: "Widowed", value: "Widowed" }
    ]
  },
  {
    name: "Nationality",
    type: "text",
    data: [
      { label: "British", value: "British" },
      { label: "French", value: "French" },
      { label: "Irish", value: "Irish" },
      { label: "Italian", value: "Italian" },
      { label: "Spanish", value: "Spanish" }
    ]
  },
  {
    name: "County",
    type: "text",
    data: [
      { label: "Berkshire", value: "Berkshire" },
      { label: "Cumbria", value: "Cumbria" },
      { label: "Leicestershire", value: "Leicestershire" },
      { label: "Surrey", value: "Surrey" },
      { label: "Tyne & Wear", value: "Tyne & Wear" },
      { label: "West Yorkshire", value: "West Yorkshire" },
    ]
  },
  {
    name: "Relation",
    type: "text",
    data: [
      { label: "Daughter", value: "Daughter" },
      { label: "Grandparent", value: "Grandparent" },
      { label: "Parent", value: "Parent" },
      { label: "Son", value: "Son" }
    ]
  },
  {
    name: "Department",
    type: "text",
    data: [
      { label: "Accounts", value: "Accounts" },
      { label: "IT", value: "IT" },
      { label: "Logistics", value: "Logistics" },
      { label: "Manufacturing", value: "Manufacturing" },
      { label: "Sales", value: "Sales" }
    ]
  },
  {
    name: "Pay Basis",
    type: "text",
    data: [
      { label: "Annual", value: "Annual" },
      { label: "Weekly", value: "Weekly" },
      { label: "Hourly", value: "Hourly" }
    ]
  }
]);