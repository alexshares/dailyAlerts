var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var Pixel = mongoose.model('Pixel');
var PixelTemplates = mongoose.model('PixelTemplate');

exports.create = function(req, res){

	var newPixel = {
				data : req.body.data,
				dateCreated: new Date(),
				templateId: req.params.template
				};

	Pixel.create(newPixel, function(err, result ){

		if ( err ) { 	

			console.log ( error );
		
			return res.status(200).send('500 - Internal Server Error Please contact support at shareasale@shareasale.com with');
						// need to add issue logging model for support ticket automation
		} else {

			if(!result){
			
				console.log( 'Pixel not found for ID ' + req.params.id );
			
				return res.status(404).send("404 - Sorry, no records found. Please contact support at shareasale@shareasale.com");    
		
			} else {  
				
				console.log( 'pixel found with id ' + result._id );

				if ( 0 === result.lock ) {

					return res.status(200).send(result);
		
				} else {

					return res.status(200).send('This file has been locked because it may be antiquated. Please contact support at shareasale@shareasale.com');

				}
			}
		}
	});

};

exports.findById = function(req, res){
	
	Pixel.findOne({'_id':req.params.id}, function(err, result) {

		if(!err){
		
			return res.status(505).send(err);
		
		} else {
			
			if(!result){
			
				e404(res, "pixel", req.params.id); 
		
			} else {  
				
				console.log( 'pixel found with id ' + result._id );

				if ( 0 === result.lock ) {

					return res.status(200).send(result);
		
				} else {

					return res.status(200).send('This file has been locked because it may be antiquated. Please contact support at shareasale@shareasale.com');

				}
			}
		}
	});

};

exports.render = function (req, res){
	var pixelId = req.params.id;
	console.log("rendering pixel " + pixelId)
	Pixel.findOne ({"_id":pixelId}, function (err, pixel){
		if ( err ) {
			console.log ( err );
		} else {
			if ( !result )  {

				e404(res, "pixel", pixelId);

			} else {

				var Templateid = "";
					Templateid = Templateid + pixel.templateId;

				PixelTemplate.findOne({"_id":Templateid}, function ( err, template ) {

					if ( err ) {
						
						console.log ( err );

					} else {

						if ( !result )  {

							e404(res, "pixel", pixel.templateId);

						} else {



						}
					}

				} );

			}
		}

	});

	// get the pixel by id 

};


	


function e404 ( res, type, id ) {

				console.log( type + ' not found for ID ' + id );
			
				return res.status(404).send("404 - Sorry, no records found. Please contact support at shareasale@shareasale.com");    
}