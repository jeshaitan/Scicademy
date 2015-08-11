var http = require("http"),
	mongojs = require("mongojs"),
	express = require('express'),
  	cors = require('cors'),
	fs = require("fs"),
	url = require("url");

app = express();
app.use(cors());

var uri = "mongodb://<dbuser>:<dbpassword>@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users"]);

app.get('/getUser/:email/:passwd', function(req, res, next) {
  var users = db.Users.find({"email": req.params.email,
	                        "password": req.params.passwd});
  user = users.toArray[0];
  res.json(user);
});

app.listen(8888, function() {
  console.log('CORS-enabled web server listening on port 8888');
});