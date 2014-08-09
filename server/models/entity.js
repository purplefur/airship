var mongoose = require('mongoose');

var fieldSchema = mongoose.Schema({
  _id: Number,
  label: String,
  source: String,
  type: String,
  referenceData: String
});

var screenSchema = mongoose.Schema({
  _id: Number,
  name: String,
  type: String,
  fields: [fieldSchema],
  list: [fieldSchema]
});

var entitySchema = mongoose.Schema({
  _id: Number,
  name: String,
  plural: String,
  collectionName: String,
  screens: [screenSchema]
});

var Entity = mongoose.model('Entity', entitySchema, 'entities');

module.exports = Entity;