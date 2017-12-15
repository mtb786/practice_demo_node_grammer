var docModel =require('../app/models/document');

module.exports = {

	addDocument : function(req,res) {

		try {
			var document =new docModel();
			document.documenttext= req.body.documenttext;
			 document._user = {_id : req.body._user._id};
			document.save(function(error) {
				if(error) {
				return	res.status(400).send({message:error});
				} else {
				return	res.status(200).send({message:'Document Added'});
				}
			})

		}catch(error) {

			return res.status(400).send({message:error});
		}

	},

	listDocument : function(req,res) {
		try {
			var option =  req.query ||  {};
			docModel.find(option).populate("_user._id","email_id contact_no usertype").exec().then(function (response,error){
				if(error) {
					return res.status(400).send({ status: false, message: JSON.stringify(error)});
				} else {
					return	res.status(200).send({data:response});

				}

			});

		}catch(err) {
			console.log(err);
			res.status(400).send({message: err});
		}
	},
	deleteDocument : function(req,res) {
		try {
			var listid =req.body.id;
			if(listid){
				docModel.findByIdAndRemove(listid,(err,del) => {
					console.log(del);
					if(err) 
					{
						return res.status(400).send({message:err});
					}else if(del) {
						return res.status(200).send({message:'Your Document is Deleted'});
					}
					else  {
						return res.status(400).send({message:'Data Not Found'});

					}
				})
			} else {
				return res.status(400).send({message:'Wrong Input Data'});
			}
		}catch(err) {
			return res.status(400).send({message:err});
		}
	}
}