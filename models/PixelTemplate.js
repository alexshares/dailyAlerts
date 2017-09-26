var mongoose = require('mongoose');
Schema = mongoose.Schema;
var Merchant = mongoose.model('Merchant');

var PixelTemplateSchema = new Schema ({

  path: String,
  key: String,
  dateCreated: Date,
  lastModified: Date
});

module.exports = mongoose.model('PixelTemplate', PixelTemplateSchema);