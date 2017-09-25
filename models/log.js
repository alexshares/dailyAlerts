var mongoose = require('mongoose');
Schema = mongoose.Schema;

var LogSchema = new Schema ({
  userId: String,
  uploadId: String,
  itemId: String, 
  entry: String,
  timeStamp: Date
});

mongoose.model('Log', LogSchema);

module.exports = mongoose.model('Log');