var mongoose = require('mongoose');
Schema = mongoose.Schema;

var User = mongoose.model('User');
var tools = require('../modules/tools.js');

var uploadSchema = new Schema ({
  userId: String,
  raw: String,
  action: String, 
  start: Date,
  finished: Date,
  status: String
});

uploadSchema.methods.parse = function parse(){

	console.log('raw data: ' + this.raw);
	      	var upload = {
	      		"raw":this.raw,
	      		"_id":this.id,
	      		"action":this.action
	      	};
	      	console.log(upload);
	// find the user to get their sas token and key
	User.findOne({'_id':this.userId}, function( err, user ){
		if (err) {
	      return res.status(400).send('user lookup failed for user ' + this.userId + ' with err ' + err); 
	      console.log(err);
	    
	    }else{
	      if(user){
	      	console.log('user found with token ' + user.sasToken);

	      	i(user, upload);
	  	  }else{
	  	  	console.log('failed to find user with id ' + this.userId);
	  	  }
	    }
	});

	function i(user, upload){

	// s this method creates child items from an upload
		var token = user.token;
		var key = user.pk;

		if(upload.raw){
			var rows = upload.raw.split("\r\n");	
			console.log("userId: " + user._id);
			for ( var i = 0; i < rows.length; i++){
				var newItem = {
					"uploadId":upload._id,
					"raw":rows[i],
					"action":upload.action,
					"userId":user._id
				};
				tools.createItem(newItem);

			}
		}else{
			console.log('no data for item ' + upload._id);
		}
	}
};

mongoose.model('Upload', uploadSchema);

module.exports = mongoose.model('Upload');