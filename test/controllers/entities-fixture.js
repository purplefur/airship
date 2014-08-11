var id = require('pow-mongodb-fixtures').createObjectId;

exports.entities = [
  {
    _id: id(),
    name: 'Employee',
    plural: 'Employees',
    collectionName: 'employees',
    screens: [
      {
        _id: id(),
        name: 'Bank'
      },
      {
        _id: id(),
        name: 'Address'
      }
    ]
  },
  {
    _id: id(),
    name: 'Post',
    plural: 'Posts',
    collectionName: 'posts',
    screens: [
      {
        _id: id(),
        name: 'Details'
      },
      {
        _id: id(),
        name: 'Requirements',
        type: 'Single',
        fields: [
          { _id: id(), label: "Id", type: "text", source: "postId" },
          { _id: id(), label: "Title", type: "text", source: "title" }
        ]
      }
    ]
  }
]