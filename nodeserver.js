var http = require("http"),
	mongojs = require("mongojs"),
	express = require('express'),
  	cors = require('cors'),
	fs = require("fs"),
  	path = require('path'),
	url = require("url"),
	bodyParser = require('body-parser'),
  	port = process.env.PORT || 8888;

app = express();
app.use(cors());
app.use(bodyParser.json());

var uri = "mongodb://jeshaitan:aliro4greatgood@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users"]);

app.get('/getUser/:email/:password', function(req, res, next) {
    console.log("received getUser request " + req.params.email)
    var user = db.Users.findOne({
        "email": req.params.email,
        "password": req.params.password
    }, function(err, doc) {
        	if (err) {
            	res.json({error: 'error retrieving the JSON user' });
        	}
        	else {
        		console.log("user found: " + doc.school)
            	res.json(doc);
            }
    });
});

app.get('/addUser/:email/:password/:firstname/:lastname/:school/:grade', function(req, res, next) {
    console.log("received addUser request")
    db.Users.insert({email:req.params.email, 
                   password:req.params.password, 
                   firstname:req.params.firstname,
                   lastname:req.params.lastname,
                   school:req.params.school,
                   grade:req.params.grade}, function(err, record) {
        if (err) {
            console.log({error: 'error inserting new user'});
        }
        else {
            console.log("inserted new user");
        }
    });
});

app.post('/getPaper', function(request, response) {
	console.log(request.body);
	db.Papers.find({title: request.body.query}, function(err, curs) {
		if(err) {
			console.log("error finding paper!");
			response.send({});
		}
		else {
			console.log(curs);
			response.send(curs);
		}
	});
});

app.post('/addPaper', function(request, response) {
	console.log(request.body);
	db.Papers.insert({title:request.body.title,
					  authors: request.body.authors,
					  abstract: request.body.abstract,
					  keywords: request.body.keywords}, function(err, record) {
		if(err) {
			console.log({error: 'error inserting new paper'});
		}
		else {
			console.log("inserted new paper");
		}
	});
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
	console.log('CORS-enabled Aliro web server listening on port ' + port);
});