var http = require("http"),
		mongojs = require("mongojs"),
		express = require('express'),
		fs = require("fs"),
  	path = require('path'),
		url = require("url"),
		bodyParser = require('body-parser'),
  	port = process.env.PORT || 8888,
		grid = require('gridfs-stream'),
		mongo = require('mongodb'),
  	ObjectID = require('mongodb').ObjectID;

app = express();
app.use(bodyParser.json());

var uri = "mongodb://PublicIO:publicpass@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Pdfs", "Users"], {authMechanism: 'ScramSHA1'});

app.post('/getUser', function(request, response) {
    var searchObj = {};
    if(request.body.hasOwnProperty('searchType') && request.body.searchType == "id") {
			searchObj = {"_id" : ObjectID(request.body.query)};
    }
    else {
    	searchObj = {
        "email": request.body.email,
        "password": request.body.password
    	}
    }
    var user = db.Users.findOne(searchObj, function(err, doc) {
        	if (err) {
            	response.send({error: 'error retrieving the JSON user' });
            	console.log('error recieving user');
        	}
        	else {
							if(request.body.hasOwnProperty("meta")) {
								response.send({"doc": doc, "meta": request.body.meta});
							}
							else {
								response.send(doc);
							}
          }
    });
});

app.post('/getPaper', function(request, response) {
	if(request.body.searchType == "All") {
		var searchObject = {$or: [{$text: {$search: request.body.query}},
							   {keywords: request.body.query},
							   {authors: request.body.query}]};
	}
	else if(request.body.searchType == "Title") {
		var searchObject = {$text: {$search: request.body.query}};
	}
	else if(request.body.searchType == "Keywords") {
		var searchObject = {keywords: request.body.query};
	}
	else if(request.body.searchType == "Author") {
		db.Users.find({$text: {$search: request.body.query}}, function(err, curs) {
			if(err) {
				console.log(err)
			}
			else {
				var searchObject = "";
				for (var i = 0; i < curs.length; i++) {
					searchObject += "{\"authors\": \"" + curs[i]._id + "\"},"
				}
				searchObjectArray = JSON.parse("[" + searchObject.substring(0, searchObject.length - 1) +"]");
				db.Papers.find({$or: searchObjectArray}, function(err, curs) {
					if(err) {
						console.log(err);
					}
					else {
						response.send(curs);
					}
				});
			}
		});
	}
	else if(request.body.searchType == 'id') {
		var searchObject = {"_id" : ObjectID(request.body.query)};
	}
	else if(request.body.searchType == 'every') {
		var searchObject = {}
	}
	if(request.body.searchType != "Author") {
		db.Papers.find(searchObject, function(err, curs) {
			if(err) {
				console.log(err);
			}
			else {
				response.send(curs);
			}
		});
	}
});

app.post('/addUser', function(request, response) {
	db.Users.insert({email: request.body.eml,
					  password: request.body.pwd,
						name: request.body.fnm + request.body.lnm,
					  firstname: request.body.fnm,
					  lastname: request.body.lnm,
					  school: request.body.shl,
					  grade: request.body.grd,
					  publications: request.body.pub,
					  datejoined: request.body.dte}, function(err, record) {
		if(err) {
			console.log(err);
		}
		else {
			response.send(record);
		}
	});
});

app.post('/addPaper', function(request, response) {
	db.Papers.insert({title:request.body.title,
					  authors: request.body.authors,
					  abstract: request.body.abstract,
					  keywords: request.body.keywords,
					  pdf: request.body.pdf,
					  date: request.body.date}, function(err, record) {
		if(err) {
			console.log(err);
		}
		else {
			db.Papers.findOne({abstract: request.body.abstract}, function(err, doc) {
				if(err) {
					console.log(err);
				}
				else {
					var authorsIdStrings = doc.authors,
						authorsOId = [];
					for(var i = 0; i < authorsIdStrings.length; i++) {
						authorsOId.push(ObjectID(authorsIdStrings[i]));
					}

					db.Users.update({_id: {$in: authorsOId}}, {$push: {publications: (""+doc._id)}}, {multi:true}, function(err, result) {
						if(err) {
							console.log(err);
						}
						else {
							console.log(JSON.stringify(doc.authors));
						}
					});
				}
			});
			response.send(record);
		}
	});

});
var gfs = grid(db, mongo);

app.post('/addPdf', function(req, res) {
	console.log(req);
	req.pipe(gfs.createWriteStream({
		filename: 'pdf'
	}));
	res.send('success');
});

app.post('/getPdf', function(req, res) {
	console.log('pdf requested');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/404.html'));
});

app.listen(port, function() {
	console.log('Aliro back-end server listening on port ' + port);
});
