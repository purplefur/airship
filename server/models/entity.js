var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var fieldSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  label: String,
  source: String,
  type: String,
  referenceData: String
});

var screenSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  source: String,
  type: String,
  fields: [fieldSchema],
  list: [fieldSchema]
});

var entitySchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  plural: String,
  collectionName: String,
  screens: [screenSchema]
});

var Entity = mongoose.model('Entity', entitySchema, 'entities');

module.exports = Entity;