
// Node System Imports 
var  express= require('express');
const app= express();
var mongo =require('mongoose');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongo.Promise = global.Promise;
 mongo.connect('mongodb://localhost:27017/grammertool', { useMongoClient: true },function(err) {
 	if(err){
        console.log('database not connected');
    }
 });
// Routing 
require('./app/routes.js')(app);
app.listen(3000);

console.log('App Lisiten on 3000 Port');
