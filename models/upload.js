var mongoose = require('mongoose');
Schema = mongoose.Schema;
var Merchant = mongoose.model('Merchant');

var uploadSchema = new Schema ({
  raw: String,
  list: [], 
  status: String,
  date: Date
});

uploadSchema.methods.parse = function parse(){

	console.log('parsing upload with date ' + this.date);

	// find or create merchant accounts for each item in the upload list
	for(var i = 0; i < this.list.length; i++ ){
		var thismid = this.list[i];
		console.log('searching for merchant ' + this.list[i] );
		checkAndUpdate(thismid);		
	
	}

	function checkAndUpdate(mid){
		Merchant.findOne({'mid':mid}, function( err, merchant ){
			if(!merchant){
				// create merchant and set last mod to date(now)
				console.log('merchant created with mid ' + mid);

				var newMerchant = {
					"mid":mid,
					"dailyAlertCounter":1,
					"lastModified": new Date()
				};

				// create a new merchant with the data  
				Merchant.create(newMerchant, function(err, upload) {
					if (err) {
					  console.log("error creating merchant with mid: " + err); 
					}else{
					  console.log("New merchant created with mid " + mid);
					}
				});
			}else{
				// increment merchant counter
				console.log("merchant with id " + mid + " daily alert count update triggered");
				
				// if the lastModified date is older than 1 week, set the counter to 0
				var newCounter;
				var today = new Date();
				var limitDate = new Date;
					limitDate.setDate(today.getDate() - 7);
				if(merchant.lastModified > limitDate ){
					newCounter = merchant.dailyAlertCounter + 1;
				} else {
					newCounter = 1;
				}

				// status is set based on the new value of the dailyAlertCounter
				var newStatus = "";
				if ( 2 == merchant.dailyAlertCounter ) {
					newStatus = "alert";
				} else if ( 1 == merchant.dailyAlertCounter ) {
					newStatus = "in review";
				} else if ( 0 == merchant.dailyAlertCounter ) {
					newStatus = "pending review";
				} else {
					newStatus = "new";
				}

				var updatedMerchant = {
					  "dailyAlertCounter": newCounter,
					  "status": newStatus, 
					  "lastModified": new Date()
				};

				var query = {
					"mid":mid
				};

				Merchant.findOneAndUpdate(query, updatedMerchant, {upsert:true}, function(err, merchant){
					if ( err ) {
						console.log('error updating Merchant')
					} else {
						console.log('merchant ' + merchant.mid + " counter updated to " + merchant.dailyAlertCounter)
					}

				});
			}
		});
	}

};

module.exports = mongoose.model('Upload', uploadSchema);