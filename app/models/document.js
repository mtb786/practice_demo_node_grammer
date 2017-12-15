var mongo= require('mongoose'),
Schema =mongo.Schema;
let documents = mongo.Schema({
	documenttext : String,
	_user: [{
		_id: {
			type :Schema.Types.ObjectId,
			ref: 'user'
		}	
	}]
});


module.exports = mongo.model('documents',documents);
