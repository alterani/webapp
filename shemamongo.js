var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//SCHEMA FIERE
var SchemaFiera = new Schema({
  fiera: String


});

module.exports = mongoose.model('documents', SchemaFiera);