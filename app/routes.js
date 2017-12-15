
var wordsController = require('../controller/words');
var userController =require('../controller/user');
var documentController= require('../controller/documentController');
var ocrDocument =require ('../controller/ocrdocument');


var multer  = require('multer');
var cors = require('cors')
var ocrStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    	cb(null, 'ocrImages/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
});

var upload = multer({ storage: ocrStorage });


module.exports = function(app){

// Word List 
app.get('/wordslist',cors(),wordsController.getWords);
app.post('/wordslist',cors(),wordsController.addWords);


app.post('/addUser',cors(),userController.addUser);
app.post('/authuser',cors(),userController.authUser);



// Document 

app.post('/adddocument',cors(),documentController.addDocument);
app.get('/listDocument',cors(),documentController.listDocument);
app.post('/deletedocument',cors(),documentController.deleteDocument);


// Ocr Document 
app.post('/ocrdocument',  upload.any(),ocrDocument.ocrDocumentSet);

};


