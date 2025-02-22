//---------------mongoose image schema
const mongoose = require('mongoose');
const { applyTimestamps } = require('./schema');

const image_schema = new mongoose.Schema({
  url : {
    type : String,
    require : true
  },
  publicId : {
    type : String,
    require: true
  },
  uploadedBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    require : true
  },
},{timestamps : true});

module.exports = mongoose.model('Image', image_schema);