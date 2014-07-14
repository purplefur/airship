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
    name: "Religion",
    type: "text",
    data: [
      { label: "Muslim", value: "Muslim" },
      { label: "Christian - Catholic", value: "Christian - Catholic" }
    ]
  }
]);