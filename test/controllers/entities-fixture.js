exports.entities = [
  {
    _id: 1,
    name: 'Employee',
    plural: 'Employees',
    collectionName: 'employees',
    screens: [
      {
        _id: 1,
        name: 'Bank'
      },
      {
        _id: 2,
        name: 'Address'
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
        name: 'Details'
      },
      {
        _id: 2,
        name: 'Requirements'
      }
    ]
  }
]