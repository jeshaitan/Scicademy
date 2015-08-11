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
    var user = db.Users.findOne({
        "email": req.params.email,
        "password": req.params.passwd
    }, function(err, doc) {
        	if (err) {
            	res.json({error: 'error retrieving the JSON user' });
        	}
        	else {
            	res.json(doc);
            }
        }
    });
});

app.get('/', function(req, res, next) {
	res.send("CORS-enabled node response")
});

app.listen(8888, function() {
	console.log('CORS-enabled Aliro web server listening on port 8888');
});