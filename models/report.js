var mongoose = require('mongoose');
Schema = mongoose.Schema;
var Merchant = mongoose.model('Merchant');

var ReportSchema = new Schema ({
  list: [],
  type: String,
  dateCreated: Date
});

module.exports = mongoose.model('Report', ReportSchema);