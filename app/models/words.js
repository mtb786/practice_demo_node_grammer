let mongo =require('mongoose');

let words = mongo.Schema({
	words : String 
});

module.exports =mongo.model('grammerwords',words);