var ocrDoc = require('../app/models/ocrdocument');
var tesseract = require('node-tesseract');
module.exports ={
	ocrDocumentSet : function(req,res) {
		try {
				console.log(__dirname);
				tesseract.process('ocrImages/icons8-settings-50.jpg',function(err, text) {
    				if(err) {
        					console.error(err);
   				 } else {
        					console.log(text);
   			 }
		});

			var ocrDocument=new ocrDoc();
			 ocrDocument.filepath= req.files[0]['path'];
			 ocrDocument.save(function(err){
			 	if(err) {
			 	return	res.status(400).send({message:'Something Went Wrong'});
			 	} else {
			 		return res.status(200).send({message : 'OCR Image Added'});
			 	}
			 });	
		}catch(err) {
			console.log(err);
			return res.status(400).send({message:'Something Went Wrong'});
		}
	}
}