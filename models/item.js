var mongoose = require('mongoose');
Schema = mongoose.Schema;
var User = mongoose.model('User');
var Query = mongoose.model('Query');

var itemSchema = new Schema ({
  userId: String,
  uploadId: String,
  raw: String,
  action: String, 
  sent: Date,
  received: Date,
  status: String,
  queryId: String
});

itemSchema.methods.updateStatus = function updateStatus ( err, response, body ){
	if ( err ) console.log( err );
	if ( response ) console.log( response );
	if ( body ) console.log( body );
	if ( !err && !response && !body ) console.log( 'no data' );
};

itemSchema.methods.send = function send(user){

	var cols = this.raw.split(',');

	// prepare query statement
	if ('void' === this.action) {
		var params = {
			"action":"void",
			"ordernumber":cols[0],
			"date":cols[1],
			"reason":cols[2],
			"vChild":cols[3],
			"token":user.sasToken
		};


	} else if ( 'edit' === this.action ) {
		var params = {
			"action":"edit",
			"ordernumber":cols[0],
			"date":cols[1],
			"reason":cols[2],
			"vChild":cols[3],
			"token":user.sasToken
		};


	} else if ( 'reference' === this.action ) {
		var params = {
			"action":"reference",
			"ordernumber":cols[0],
			"date":cols[1],
			"reason":cols[2],
			"vChild":cols[3],
			"token":user.sasToken
		};

	}

	var newQuery = {
		"itemId":this._id, 
		"params":params
	};

	// prepare query and fire off the api call function
	Query.create(newQuery, function (err, query) {
      if (err) return console.log(err);

      	if ( query ) {
	      console.log('new query ' + query._id);
	      console.log(newQuery);
	      query.send( user, params);
		}

	});


}

mongoose.model('Item', itemSchema);

module.exports = mongoose.model('Item');