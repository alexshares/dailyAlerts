var mongoose = require('mongoose');

Schema = mongoose.Schema;

var Merchant = mongoose.model('Merchant');


var pixelSchema = new Schema ({	data: [{ key: String,
									  	 val: String }],

								templateId: String,
								lastModified: { 
										type: Date, 
										default: +new Date()},
								lock: { type: Number, 
										default: 0 },
								dateCreated: Date 		
							});

mongoose.model('Pixel', pixelSchema);


module.exports = mongoose.model('Pixel');