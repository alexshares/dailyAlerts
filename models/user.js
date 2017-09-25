var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema ({
  email: String, 
  pwhash: String, 
  lastLogin: Date,
  lastAction: Date,
  passwordHash: String,
  token: String,
  merchantId: String, 
  sasToken: String,
  sasPk: String,
  reset: Boolean
});

userSchema.methods.checkToken = function checkToken(token, callback){
  // console.log(token);
  // console.log(this.token);
  
  if(token == this.token){
    // console.log('user ' + this._id + ' validated');
    callback(true, this);

  }else{
    callback(false, this);
    // console.log('user ' + this._id + ' invalidated');
  }
};

userSchema.methods.setToken = function setToken(setCookie){
    // console.log('setting token for user ' + this._id);
    // generate a new token for the user
    var randomNumber = Math.random().toString();
    var token = randomNumber.substring(2,randomNumber.length);
    var User  = mongoose.model('User');
    
    User.findOneAndUpdate({'_id':this.id}, {"token":token}, function(err, res){
      if(err){
        return res.status(400).send('set token failed ' + err);
        // console.log('set token failed' + err);

      }else{
	if(res){
	  // console.log(res);
          setCookie(token,res._id);
        }else{
	  return res.status(404).send('set token failed: user not found ' + this.id);
          // console.log('set token failed: user not found ' + this.id);

        }
      } 
   });

}

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');
