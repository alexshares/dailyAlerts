var request 	 = require('request');
var sha256  	 = require('sha256');
var mongoose 	 = require('mongoose');
var Item 		 = mongoose.model('Item');

// Params must be sent in the following format (JSON)
// var params 		 = {
// 						"merchantId": mid,
//  					"token": APIToken,
//  					"version": APIVersion,
//  					"action": actionVerb
//  					};

// Other required parameters for authentication
// var mid 		 = '27453';
// var APIToken 	 = "LSu4ns5j7BAopz5z";
// var APISecretKey = "SSy2mo6l3TNgmb3nHCn8id1z5TJczq7n";

// Action Verb specifies the mode

module.exports.send = function send ( query, user ) {
	var actionVerb	 = query.params.action;
	var APISecretKey = user.sasPk;
	var APIVersion   = 2.8;
	var ts 			 = new Date();

	var sig 		 = APIToken + ":" + ts + ":" + actionVerb + ":" + APISecretKey;
	var sigHash 	 = sha256(sig);

	var headers 	 = {
						"x-ShareASale-Date":ts, 
						"x-ShareASale-Authentication":sigHash
						}; 

	var options		 = { 
						    url: 'http://api.shareasale.com/w.cfm',
						    method: 'GET',
						    headers: headers,
						    qs: params,
						    returnTransfer: true
						};

	// Start the request
	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	       	// get the item this query was for
	       	Item.findOne({'_id':query.itemId}, function( err, item ){
	       		if (err) {
			    	return res.status(400).send('item lookup failed for user ' + query.itemId + ' with err ' + err); 
			    	console.log(err);
			    }else{
			    	item.updateStatus( err, response, body );
			    }
	    	});
	    }
	});
}

