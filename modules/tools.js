var mongoose 	 = require('mongoose');
var Item = mongoose.model('Item');

module.exports.createItem = function createItem ( newItem ){
				Item.create(newItem, function(err, item) {
			    if (err) {
			      return res.status(400).send('item creation failed for row ' + i + ' with err ' + err); 
			      console.log(err);
			    
			    }else{
			      if(item){
			        //console.log("New item created for user " + item.userId + " with id " + item._id);
			        item.send(user);
			  	  }else{
			  	  	console.log('item creation failed to return item');
			  	  }
			    }
			  	});

};