
let wordsModel=require('../app/models/words');

module.exports={
	getWords: function(req,res){
		let response =wordsModel.find(function(err,words) {
			req.res.status(200).send(words);
		})
	},  
	addWords : function(req,res) {
		try {
			let addwords =new wordsModel();
			addwords.words=req.body.words;
			console.log(addwords.words);	
			addwords.save(function(err,msg){
				if (err) {
					return res.status(400).send({ message: JSON.stringify(err) })
					return req.res.status(200).send({status:true, data: addwords});
				}
				else {
						return res.send({ message: 'Word Addedd',status:req.res.status });
					
				}
			});
		}catch(e) {
			console.log(e);
			return res.status(400).send({  message: e })
		}	
	}
}
