var request 	 = require('request');
var sha256  	 = require('sha256');

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

module.exports.send = function send ( actionVerb, params, APIToken, mid, APISecretKey ) {

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
	        // Print out the response body
	        cb( response, body );
	    }
	})
}

