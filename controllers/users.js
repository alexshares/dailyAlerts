var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var cookieParser = require('cookie-parser');
var User = mongoose.model('User');

exports.findAll = function(req, res){
  User.find({},function(err, results) {
    // if (err) return console.log(err);
    return res.status(200).send(results);
  });
};

exports.login = function(req, res){
  // console.log('login attempted ' + req);
  var email = req.body.email;
  var pw = req.body.pw;
  User.findOne({'email':email},function(err, result) {
  
   if(!result){
     return res.status(200).send("User not found");    
   }else{  
    var hpw = result.passwordHash;
    if(passwordHash.verify(pw,hpw)){
     // console.log('password is correct');
     result.setToken(setTokenCookie);

    }else{
     // console.log('password is incorrect');

     return res.status(200).send("Incorrect Password");
    }
   }
  });

  function setTokenCookie(tokval,userId) {
        // make sure to clear the cookie if it exists
        res.cookie("token",tokval, { maxAge: 900000, httpOnly: false });
        // console.log(res);
      	var rdata = {
      	  "token":tokval,
      	  "userId":userId
      	};
        return res.status(200).send(rdata);  
  }
  
}

exports.create = function(req, res){
  var pw = passwordHash.generate(req.body.pw);
  // console.log(pw);
  // check uniqueness of password ***

  User.findOne({'email':req.body.email},function(err, result) {
    // if (err) return console.log(err);
    // console.log('user selected with email:' + req.body.email + ' and content ' + result);
    if (!result) {
      submitUser();
    }else{
      return res.status(200).send("User already exists with email " + req.body.email);  
    }
    
  });

  function submitUser(){
    var newUser = {
  	"name":req.body.name,
  	"email":req.body.email,
  	"score":req.body.score,
  	"passwordHash":pw
  	};

    User.create(newUser, function (err, user) {
      // if (err) return console.log(err);
      // console.log('user submitted ' + newUser);
      return res.status(200).send(user);
    });
  }
};

// exports.findById = function(req, res){
//   var id = req.params.id;
//   User.findOne({'_id':id},function(err, result) {
    // if (err) return console.log(err);
    // console.log('user selected with id:' + id + ' and content ' + result);
//     return res.status(200).send(result);
//   });
// };

exports.upSettings = function(req, res){
  console.log(req.body);
  var id = req.body.userId;
  var data = {
    "sasToken":req.body.sasToken,
    "sasPk":req.body.privateKey,
    "merchantId":req.body.merchantId
  };
  // validate pkey token pair by running a query

  User.findOneAndUpdate({'_id':id}, data , function(err, result) {
    // if (err) return console.log(err);
    // console.log('user selected with id:' + id + ' and content ' + result);
    return res.status(200).send(result);
  });
};

// exports.delete = function(req, res) {
//   var id = req.params.id;
//   User.remove({'_id':id},function(result) {
//     return res.send(result);
//   });

// }


