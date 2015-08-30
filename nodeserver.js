var http = require("http"),
	mongojs = require("mongojs"),
	express = require('express'),
  	cors = require('cors'),
	fs = require("fs"),
  	path = require('path'),
	url = require("url"),
	bodyParser = require('body-parser'),
  	port = process.env.PORT || 8888,
  	ObjectID = require('mongodb').ObjectID;

app = express();
app.use(cors());
app.use(bodyParser.json());

var uri = "mongodb://jeshaitan:aliro4greatgood@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users", "Posters"]);

app.post('/getUser', function(request, response) {
    console.log(request.body);
    var user = db.Users.findOne({
        "email": request.body.email,
        "password": request.body.password
    }, function(err, doc) {
        	if (err) {
            	response.send({error: 'error retrieving the JSON user' });
        	}
        	else {
        		console.log("sent user to front end");
            	response.send(doc);
            }
    });
});

app.post('/getPaper', function(request, response) {
	console.log(request.body);
	var searchObject = {};
	if(request.body.searchtype == "All") {
		searchObject = {$and: [{title: request.body.query},
							   {keywords: request.body.query},
							   {authors: request.body.query}]};
	}
	else if(request.body.searchtype == "Title") {
		searchObject = {title: request.body.query};	
	}
	else if(request.body.searchtype == "Keywords") {
		searchObject = {keywords: request.body.query};
	}
	else if(request.body.searchtype == "Authors") {
		searchObject = {authors: request.body.query};
	}
	else if(request.body.searchtype == 'id') {
		console.log("set searchObject -> id");
		searchObject = {"_id" : ObjectID(request.body.query)};
	}
	db.Papers.find(searchObject, function(err, curs) {
		if(err) {
			console.log({error: "error finding paper!"});
		}
		else {
			console.log(curs);
			response.send(curs);
		}
	});
});

app.post('/addUser', function(request, response) {
	console.log(request.body);
	db.Users.insert({email: request.body.eml,
					  password: request.body.pwd,
					  firstname: request.body.fnm,
					  lastname: request.body.lnm,
					  school: request.body.shl,
					  grade: request.body.grd,
					  datejoined: request.body.dte}, function(err, record) {
		if(err) {
			console.log({error: 'error inserting new user'});
		}
		else {
			console.log("inserted new user");
			response.send(record);
		}
	});
});

app.post('/addPaper', function(request, response) {
	console.log(request.body);
	db.Papers.insert({title:request.body.title,
					  authors: request.body.authors,
					  abstract: request.body.abstract,
					  keywords: request.body.keywords,
					  pdf: request.body.pdf}, function(err, record) {
		if(err) {
			console.log({error: 'error inserting new paper'});
		}
		else {
			console.log("inserted new paper");
			response.send(record);
		}
	});
});

app.post('/addPoster', function(request, response) {
	console.log(request.body);
	db.Posters.insert({title: request.body.title,
					   captions: request.body.captions,
					   authors: request.body.authors,
					   abstract: request.body.abstract,
					   images: request.body.images}, function(err, record) {
		if(err) {
			console.log({error: 'error inserting new poster'});
		}
		else {
			console.log("inserted new poster");
			response.send(record);
		}
	});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
	console.log('CORS-enabled Aliro web server listening on port ' + port);
});