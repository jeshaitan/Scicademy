var http = require("http"),
	mongojs = require("mongojs"),
	express = require('express'),
  	cors = require('cors'),
	fs = require("fs"),
	url = require("url");

app = express();
app.use(cors());

var uri = "mongodb://jeshaitan:aliro4greatgood@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users"]);

app.get('/getUser/:email/:password', function(req, res, next) {
    var user = db.Users.findOne({
        "email": req.params.email,
        "password": req.params.password
    }, function(err, doc) {
        	if (err) {
            	res.json({error: 'error retrieving the JSON user' });
        	}
        	else {
            	res.json(doc);
            }
    });
});

app.get('/addUser/:email/:password/:firstname/:lastname/:school/:grade', function(req, res, next) {
    db.Users.insert({email:req.params.email, 
                   password:req.params.password, 
                   firstname:req.params.firstname,
                   lastname:req.params.lastname,
                   school:req.params.school,
                   grade:req.params.grade}, {w:1}, function(err, record) {
        if (err) {
            res.send({error: 'error inserting new user'})
        }
        else {
            res.send("inserted new user")
        }
    });
});

app.get('/', function(req, res, next) {
	res.send("CORS-enabled node response")
});

app.listen(8888, function() {
	console.log('CORS-enabled Aliro web server listening on port 8888');
});