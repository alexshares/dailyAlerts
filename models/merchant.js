var mongoose = require('mongoose');
Schema = mongoose.Schema;

var MerchantSchema = new Schema ({
  mid: Number,
  dailyAlertCounter: { type: Number, default: 0 },
  status: String, 
  lastModified: Date
});


module.exports = mongoose.model('Merchant', MerchantSchema);