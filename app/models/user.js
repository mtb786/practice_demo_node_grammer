var mongo =require('mongoose');
let userInfo = mongo.Schema({

	email_id: {
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},contact_no:{
		type:String
	},
	usertype:{
		type:String,
		required:true,
		enum:["basic","executive","admin"]
	}
});

module.exports = mongo.model('user',userInfo);