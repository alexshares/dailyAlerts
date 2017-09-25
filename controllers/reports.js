var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Merchant = mongoose.model('Merchant');

exports.newDailyReview = function(req, res){
	Merchant.find({'dailyAlertCounter':{$gt:1}}, function(err, result) {
		if(!result){
			return res.status(200).send("no records found");    
		}else{  
			return res.status(200).send(result);
		}
	});
}