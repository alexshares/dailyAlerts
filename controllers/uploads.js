var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Upload = mongoose.model('Upload');
var User = mongoose.model('User');

exports.create = function(req, res){
	
    User.findOne({'_id':req.body.userId},function(err, result) {
    if (err){ 
		return res.status(404).send(err) ;
		//console.log(err);
    	console.log('user selected with _id:' + req.body.userId + ' and token ' + req.body.token);
    }
    if (!result) {
    	//  console.log(result);
    	return res.status(401).send("User doesn't exist " + req.body.userId);
    }else{
		// User exists, so check token:
		result.checkToken(req.body.token, c);
    }

    function c(stat, user){
	console.log('creating new upload for user ' + user._id);
	if(stat === true){
	  var newUpload = {
		"action":req.body.action,
		"raw":req.body.raw,
		"userId":user._id		
	    };
	  Upload.create(newUpload, function(err, upload) {
	    if (err) {
	      return res.status(400).send('upload failed ' + err); 
	    
	    }else{
	      upload.parse();
	      return res.status(201).send("New upload created for user with id " + upload._id);

	    }
	  });
	}else{
          return res.status(401).send("User session invalid for user " + req.body.userId);

	}
    }

  });
}
