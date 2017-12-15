let userModel=require('../app/models/user');
let mailer=require('nodemailer');
const bcrypt = require('bcrypt');

module.exports={
	

	addUser : function(req,res) {
		try{
			var user=new userModel();
			user.email_id= req.body.email_id;
			user.contact_no= req.body.contact_no;
			user.usertype= req.body.usertype;	
			bcrypt.hash(req.body.password, 10,function(err,hash){
				if(err) {
					return res.status(400).send({ message:'Something Went Wrong'});
				}
				else { 	
					user.password=hash;
					user.save(function(err){
						if(err) {
							return res.status(400).send({ message: err});
						}
						else {	
							mailer.createTestAccount((err,account) => {
								let transporter = mailer.createTransport({
									host: 'smtp.gmail.com',
									port: 465,
									secure: true, 
									auth: {
										user: "grammeranalysis@gmail.com", 
										pass: "Qwerty@1001"  
									}
								});
								let registerMailOptions = {
									from: '"Bhavnani Manish"<grammeranalysis@gmail.com>', 
									to: req.body.email_id, 
									subject: 'Registerd Mail', 
									text: 'Thanks For Registration', 
									html: '<b>Thank You</b>'
								};
								transporter.sendMail(registerMailOptions, (error, info) => {
									if (error) {
										return console.log(error);
									}
									console.log('Message sent: %s', info);
									return res.status(200).send({ status : true,data : user});
									console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
								});			

							});
						}
					});
				}
			});
		}catch(e){
			console.log(e);
			return res.status(400).send({message:e});

		}
	},
	authUser : function(req,res){
		try{
		let email_id=req.body.email_id;
		let password=req.body.password;
		
		userModel.findOne({'email_id':email_id},(err,msg)=>{
			if(err) {
			console.log(err);
			}
			if(!msg) {
			return res.status(200).send({status:"401",message:'Not Valid Email Id'});	
			}
			else {
			bcrypt.compare(password,msg['password'],(err,hash) => {
				console.log(hash);
				if(err) {
					return res.status(200).send({message:err});	
				} else{
					if(hash===true) {
					return res.send({status:200,data:msg,message:'Authenticated'});
					} else {
							return res.status(200).send({status:"401",message:'Password Not Valid'});	
					}
				}
			});
			}
		});	
			}
		catch(e){
			console.log(e);
		}

	}
}