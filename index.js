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
    busboy = require('connect-busboy'),
    aws = require('aws-sdk'),
    ObjectID = require('mongodb').ObjectID,
    mailgun = require('mailgun-js')({
        apiKey: 'key-15707ef3e1cad6ad92d3f92d67db0140',
        domain: 'mg.scicademy.org'
    });

app = express();
app.use(bodyParser.json());
app.use(busboy());
var uri = "mongodb://PublicIO:publicpass@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users"], {
    authMechanism: 'ScramSHA1'
});


app.post('/completeAuthor', function(req, res) {
    //TODO search each word in the query individually and return all results ('rubin smith' currently doesn't bring up jesse smith)
    var m = req.body.letters.term;
    var searchObj = {
        "lowerName": {
            $regex: req.body.letters.term.toLowerCase()
        }
    };
    db.Users.find(searchObj, function(err, curs) {
        res.send(curs);
    })
});

app.post('/getUser', function(req, res) {
    var searchObj = {};
    if (req.body.hasOwnProperty('searchType') && req.body.searchType == "id") {
        searchObj = {
            "_id": ObjectID(req.body.query)
        };
    } else {
        searchObj = {
            "email": req.body.email,
            "password": req.body.password
        }
    }
    var user = db.Users.findOne(searchObj, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (req.body.hasOwnProperty("meta")) {
                res.send({
                    "doc": doc,
                    "meta": req.body.meta
                });
            } else {
                res.send(doc);
            }
        }
    });
});

app.post('/getTemps', function(req, res) {
    var searchObj = { "_id" : ObjectID(req.body.paperId) };
    var paper = db.Papers.findOne(searchObj, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                "temps":doc.tempAuthors,
                "meta": req.body.meta
            });
        }
    });
});

app.post('/getAllTemps', function(req, res) {
    var papers = db.Papers.find(function(err, doc) { //doc has all the papers in the "Papers" collection
        if (err) {
            console.log(err);
        } else {
            var allTemps = [];
            for (var i = 0; i < doc.length; i++){
                allTemps.push({
                    "temps":doc[i].tempAuthors,
                    "paperID":doc[i]._id
                });
            }
            var testArray = [];
            for (var i = 0; i < allTemps.length; i++){ //iterate through an array of objects for all the "tempAuthors" arrays and their ids in each paper
                for (var j = 0; j < allTemps[i].temps.length; j++){ //iterate through an array of all the objects in a tempAuthor array
                    var curArray = allTemps[i].temps;
                    var curObj = curArray[j]; //actual tempAuthor object
                        testArray.push({
                            "tempObj":curObj,
                            "respectivePaper":allTemps[i].paperID //the id of the paper for the above tempauthor object
                        }); //so now this is an array with a tempautthor object and the id for the paper that the tempauthor object belongs to
                }
            }
            for (var i = 0; i < testArray.length; i++){
                var fNName = testArray[i].temp;
            }
            res.send(testArray);
        }
    });
});

app.post('/getPaper', function(req, res) {
    if (req.body.filter == '')
        var filter = /.*?/;
    else
        var filter = req.body.filter;

    if (req.body.searchType == "All") {
        var searchObject = {
            $or: [{
                $text: {
                    $search: req.body.query
                }
            }, {
                keywords: req.body.query
            }, {
                authors: req.body.query
            }, {
                abstract: req.body.query
            }]
        };
    } else if (req.body.searchType == "Title") {
        var searchObject = {
            $text: {
                $search: req.body.query
            }
        };
    } else if (req.body.searchType == "Keyword") {
        var searchObject = {
            keywords: req.body.query
        };
    } else if (req.body.searchType == "Author") {
        db.Users.find({
            $text: {
                $search: req.body.query
            }
        }, function(err, curs) {
            if (err) {
                console.log(err)
            } else {
                var searchObject = "";
                for (var i = 0; i < curs.length; i++) {
                    searchObject += "{\"authors\": \"" + curs[i]._id + "\"},"
                }
                searchObjectArray = JSON.parse("[" + searchObject.substring(0, searchObject.length - 1) + "]");
                if (searchObjectArray.length == 0) {
                    res.send([]);
                } else {
                    db.Papers.find({
                        $and: [{
                            $or: searchObjectArray
                        }, {
                            subject: filter
                        }]
                    }, function(err, curs) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(curs);
                        }
                    });
                }
            }
        });
    } else if (req.body.searchType == 'id') {
        var searchObject = {
            "_id": ObjectID(req.body.query)
        };
        db.Papers.find(searchObject, function(err, curs) {
            if (err) {
                console.log(err);
            } else {
                res.send(curs);
            }
        });
    } else if (req.body.searchType == 'every') {
        var searchObject = {};
    }
    if (req.body.searchType == 'Browse') {
        var searchObject = {};
    }
    if (req.body.searchType != "Author") {
        db.Papers.find({
            $and: [searchObject, {
                subject: filter
            }]
        }, function(err, curs) {
            if (err) {
                console.log(err);
            } else {
                res.send(curs);
            }
        });
    }
});

app.post('/getSchools', function(req, res) {
    db.Users.find({}, {
        school: 1
    }, function(err, curs) {
        if (err) {
            console.log(err);
        } else {
            res.send(curs);
        }
    });
});

app.post('/addUser', function(req, res) {
    db.Users.findOne({
        "email": req.body.eml
    }, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (!doc) {
                var lowerName = req.body.fnm + " " + req.body.lnm;
                db.Users.insert({
                    email: req.body.eml,
                    password: req.body.pwd,
                    name: req.body.fnm + " " + req.body.lnm,
                    lowerName: lowerName.toLowerCase(),
                    firstname: req.body.fnm,
                    lastname: req.body.lnm,
                    school: req.body.shl,
                    grade: req.body.grd,
                    isSummer: req.body.isSum,
                    publications: [],
                    datejoined: req.body.dte
                }, function(err, record) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(record);
                        var data = {
                            from: 'Scicademy <scicademy@scicademy.org>',
                            to: req.body.eml,
                            subject: 'Welcome to Scicademy!',
                            text: 'You have just created an account with Scicademy. Add some publications to show the world your passion for science!'
                        };
                        mailgun.messages().send(data, function(error, body) {
                            console.log(body);
                        });
                    }
                });
            } else {
                res.send({});
            }
        }
    });
});

app.post('/addPaper', function(req, res) {
    db.Papers.insert({
        title: req.body.title,
        authors: req.body.authors,
        abstract: req.body.abstract,
        keywords: req.body.keywords,
        institution: req.body.institution,
        pdf: req.body.pdf,
        date: req.body.date,
        published: "false"
    }, function(err, record) {
        if (err) {
            console.log(err);
        } else {
            db.Papers.findOne({
                abstract: req.body.abstract
            }, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    var authorsIdStrings = doc.authors,
                        authorsOId = [];
                    for (var i = 0; i < authorsIdStrings.length; i++) {
                        authorsOId.push(ObjectID(authorsIdStrings[i]));
                    }

                    db.Users.update({
                        _id: {
                            $in: authorsOId
                        }
                    }, {
                        $push: {
                            publications: ("" + doc._id)
                        }
                    }, {
                        multi: true
                    }, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log(JSON.stringify(doc.authors));
                        }
                    });
                }
            });
            res.send(record);
        }
    });
});
var gfs = grid(db, mongojs);
aws.config.region = 'us-east-1';
//aws.config.credentials.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
//aws.config.credentials.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

app.post('/addPdf', function(req, res) {
    var fstream;
    var rid = randomInt(129, 9999999999999);
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var name = rid + ':' + filename;
        fstream = fs.createWriteStream(__dirname + '/public/uploads/' + name);
        file.pipe(fstream);
        fstream.on('close', function() {
            fs.readFile(__dirname + '/public/uploads/' + name, function(err, data) {
                var s3bucket = new aws.S3({
                    params: {
                        Bucket: 'aliro-pdf-assets'
                    }
                });
                s3bucket.createBucket(function() {
                    var params = {
                        Key: name,
                        Body: data
                    }
                    s3bucket.upload(params, function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(name);
                            fs.unlink(__dirname + '/public/uploads/' + name);
                        }
                    });
                });
            });
        });
    });
});

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

app.post('/getPdf', function(req, res) {
    var s3 = new aws.S3();
    var params = {
        Bucket: 'aliro-pdf-assets',
        Key: req.body.query
    };
    var file = require('fs').createWriteStream(__dirname + '/public/uploads/' + req.body.query);
    s3.getObject(params).createReadStream().pipe(file);
});

app.post('/clearPdf', function(req, res) {
    fs.unlink(__dirname + '/public/uploads/' + req.body.query);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/404.html'));
});

app.listen(port, function() {
    console.log('Scicademy back-end server listening on port ' + port + '.');
});
