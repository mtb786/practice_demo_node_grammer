var mongo =require('mongoose');

var ocrDocumentSchema=mongo.Schema({
	filepath : {
		required : true,
		type: String
	}

});
module.exports=mongo.model('ocrdocument',ocrDocumentSchema);