var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Upload = mongoose.model('Upload');

exports.getUploadById = function(req, res){
	Upload.findOne({'_id':req.params.id}, function(err, result) {
		if(!result){
			return res.status(200).send("record not found");    
		}else{  
			return res.status(200).send(result);
		}
	});
}

exports.getUploadByDate = function(req, res){
	console.log('date submitted ' + req.params.date );
	Upload.findOne({'date':req.params.date}, function(err, result) {
		if(!result){
			return res.status(200).send("no records found");    
		}else{  
			return res.status(200).send(result);
		}
	});
};

exports.getUploadByDateRange = function(req, res){
	var start = req.body.start;
	var end = req.body.end;

	console.log('date start ' + start );
	console.log('date end ' + end );

	var query = {
			"$gte": new Date(start), 
			"$lt": new Date(end)
		};
	console.log(query);

	Upload.find({'date': query}, function(err, result) {
		if(!result){
			return res.status(200).send("no records found");    
		}else{  
			return res.status(200).send(result);
		}
	});
};

exports.uploadDailyData = function(req, res){

	console.log('creating new upload');

	// get the data from the request body or return 500 if null data
	if( !req.body.raw ) {
		console.log('no data uploaded');
		return res.status(500).send('invalid upload data'); 
	} else {
		var raw = req.body.raw;
	}

	// check if upload has date defined, or default to today
	if( !req.body.date ) {
		var date = new Date;
		console.log('no date stamp uploaded, setting to today: ' + date);

	} else {
		var date = new Date(req.body.date);
		console.log('setting date to user specified ' + date);
	}	

	// loop through the upload data and create an array of IDs
	var set = raw.split(',');
	console.log(set);

	// create a container to make a new upload
	var newDailyUpload = {
		"raw": raw,	
		"list": set,
		"date": date
	};

	// create a new upload with the data  
	Upload.create(newDailyUpload, function(err, upload) {
		if (err) {
		  return res.status(500).send('upload failed ' + err); 

		}else{
		  upload.parse();
		  return res.status(200).send("New upload created with id " + upload._id);

		}
	});

};

exports.hello = function hello(req, res) {
	console.log('hello');
	return res.status(200).send('hello'); 
};
