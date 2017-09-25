var mongoose    = require('mongoose');
var sha256      = require('sha256');
Schema          = mongoose.Schema;
var send        = require('../modules/send.js');

var querySchema = new Schema ({
  itemId: String,
  params: String
});

querySchema.methods.send = function send ( user ) {
  send.send( this, user );  // calls back using the item.updateStatus method on the itemId from the query 'this'
  console.log('send');

};

mongoose.model('Query', querySchema);

module.exports = mongoose.model('Query');

// formats
 // new trans
    // action='new', 
    // transtype='sale' or 'lead', 
    // userID=Number, -> SAS Aff ID
    // amount=Number, -> order total
    // tracking=String, -> new order number
    // persale=Number, -> commission set per sale
    // perlead=Number, -> commission set per lead 

 // reference
    // action='reference',
    // date=mm/dd/yyyy, -> date of transaction being referenced
    // ordernumber=String, -> referenced order number
    // transtype='sale' or 'lead',
    // amount=XX.DD, -> order total
    // tracking=String, -> new order number
    // persale=Number, -> commission set per sale
    // perlead=Number, -> commission set per lead    
