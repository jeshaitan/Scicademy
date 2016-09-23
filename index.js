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
        apiKey: 'key-9f25ba4ad1200d45612172f4ac993a65',
        domain: 'scicademy.org'
    }),
    h5bp = require('h5bp'),
    hash = require('password-hash'),
    compression = require('compression');
const createDOMPurify = require('dompurify');
const jsdom = require('jsdom');
const window = jsdom.jsdom('', {
    features: {
        FetchExternalResources: false, // disables resource loading over HTTP / filesystem
        ProcessExternalResources: false // do not execute JS within script blocks
    }
}).defaultView;
const DOMPurify = createDOMPurify(window);

app = express();
app.use(bodyParser.json());
app.use(busboy());
app.use(h5bp({
    root: __dirname + '/public'
}));

app.use(compression());
var uri = "mongodb://PublicIO:publicpass@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users"], {
    authMechanism: 'SCRAM-SHA-1'
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/404.html'));
});

app.listen(port, function() {
    console.log('Scicademy back-end server listening on port ' + port + '.');
});

var gfs = grid(db, mongojs);
aws.config.region = 'us-east-1';
aws.config.credentials.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
aws.config.credentials.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

app.post('/updateUserWithNewPapers', function(req, res) {
    db.Users.update({
        "_id": ObjectID(req.body.id)
    }, {
        $addToSet: {
            "publications": {
                $each: req.body.paperIDs
            }
        }
    }, function(err, record) {
        if (err)
            console.log(err);
        else {
            for (var i = 0; i < req.body.paperIDs.length; i++) {
                db.Papers.update({
                    "_id": ObjectID(req.body.paperIDs[i])
                }, {
                    $addToSet: {
                        "authors": req.body.id
                    },
                    $pull: {
                        "tempAuthors": {
                            "name": req.body.exTempName
                        }
                    }
                }, function(err, record) {
                    if (err)
                        console.log(err);
                    else {
                        db.Papers.update({
                            "_id": ObjectID(req.body.paperIDs[i])
                        }, {
                            $pull: {
                                "authors": 0
                            }
                        }, function(err, record) {
                            if (err)
                                console.log(err);
                        });
                    }
                });
            }
        }
    });
});

app.post('/completeAuthor', function(req, res) {
    db.Users.find(function(err, curs) {
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
            "email": req.body.email
        }
    }
    var user = db.Users.findOne(searchObj, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc != null && req.body.hasOwnProperty('password') && req.body.password != null && hash.verify(req.body.password, doc.password)) {
                res.send(doc);
            } else if (req.body.hasOwnProperty('searchType')) {
                res.send({
                    "doc": doc,
                    "meta": req.body.meta
                });
            } else {
                res.send(err);
            }
        }
    });
});


app.post('/getAllUsers', function(req, res) { //takes an array of paper objects
    var allAuthors = [];
    for (var paper in req.body) {
        if (req.body.hasOwnProperty(paper)) { //loop through each paper
            var authorArray = req.body[paper].authors; //get list of author ids
            for (var i = 0; i < authorArray.length; i++) { //loop through all the author id's
                if (authorArray[i] == 0) { //temp author
                    continue;
                }
                allAuthors.push(authorArray[i]); //allAuthors is now an array with all the author ids
            }
        }
    }
    //$or: [
    //    {_id: id1}, {_id: id2}
    //]

    if (allAuthors.length == 0) {
        res.send({});
    }
    var orArray = [];
    for (var i = 0; i < allAuthors.length; i++) {
        orArray.push({
            "_id": ObjectID(allAuthors[i])
        });
    }
    //var searchObj = {
    //    "_id" : ObjectID(authorArray[i])
    //};

    var user = db.Users.find({
        $or: orArray
    }, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

app.post('/getTemps', function(req, res) {
    var searchObj = {
        "_id": ObjectID(req.body.paperId)
    };
    var paper = db.Papers.findOne(searchObj, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                "temps": doc.tempAuthors,
                "meta": req.body.meta
            });
        }
    });
});
app.post('/getViews', function(req, res) {
    var searchObj = {
        "_id": ObjectID(req.body.paperID)
    };
    var paper = db.Papers.findOne(searchObj, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(doc.views);
        }
    });
});

app.post('/addView', function(req, res) {
    var searchObj = {
        "_id": ObjectID(req.body.paperID)
    };
    db.Papers.update(
        searchObj, {
            $inc: {
                views: 1
            }
        },
        function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.send(' ');
            }
        }
    );
});

app.post('/changeVote', function(req, res) {
    var searchObj = {
        "_id": ObjectID(req.body.paperID)
    };
    var voteStatus = req.body.voteStatus;
    var changeUpvoted = {
        upvoted: req.body.userID
    }; //this will be the text that you use to either add or remove the author from the upvoted array in the paper document
    if (voteStatus == -1) {
        db.Papers.update(
            searchObj, {
                $inc: {
                    upvotes: voteStatus * -1 //if they click it when it's already upvoted, remove the downvote
                },
                $addToSet: changeUpvoted
            },
            function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(' ');
                }
            });
    } else {
        db.Papers.update(
            searchObj, {
                $inc: {
                    upvotes: voteStatus * -1 //if they click it when it's already upvoted, remove the downvote
                },
                $pull: changeUpvoted
            },
            function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(' ');
                }
            }
        )
    }
});

app.post('/getAllTemps2', function(req, res) {
    var allAuthors = [];
    for (var paper in req.body) {
        if (req.body.hasOwnProperty(paper)) { //loop through each paper
            if (req.body[paper].tempAuthors.length == 0) { //checking if there are no tempauthors on the paper
                allAuthors.push([]);
                continue;
            }
            var paperId = paper._id; //get list of author ids
            var searchObj = {
                "_id": ObjectID(paperId)
            };
            var paper = db.Papers.findOne(searchObj, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    allAuthors.push(doc.tempAuthors); //allAuthors is now an array containing an array of tempAuthors, and each tempAuthor is an object
                }
            });
        }
    }
    res.send({
        "allAuthors": allAuthors
    });
});

var soundex = function(s) {
    var a = s.toLowerCase().split(''),
        f = a.shift(),
        r = '',
        codes = {
            a: '',
            e: '',
            i: '',
            o: '',
            u: '',
            b: 1,
            f: 1,
            p: 1,
            v: 1,
            c: 2,
            g: 2,
            j: 2,
            k: 2,
            q: 2,
            s: 2,
            x: 2,
            z: 2,
            d: 3,
            t: 3,
            l: 4,
            m: 5,
            n: 5,
            r: 6
        };

    r = f +
        a
        .map(function(v, i, a) {
            return codes[v]
        })
        .filter(function(v, i, a) {
            return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
        })
        .join('');

    return (r + '000').slice(0, 4).toUpperCase();
};

var difference = function(first, second) {
    var res = 0;
    for (var i = 0; i < first.length; i++) {
        if (first.charAt(i) == second.charAt(i)) {
            res++;
        }
    }
    return res;
};


app.post('/getAllTemps', function(req, res) {
    var papers = db.Papers.find(function(err, doc) { //doc has all the papers in the "Papers" collection
        if (err) {
            console.log(err);
        } else {
            var allTemps = [];
            for (var i = 0; i < doc.length; i++) {
                allTemps.push({
                    "temps": doc[i].tempAuthors,
                    "paperID": doc[i]._id
                });
            }
            var testArray = [];
            for (var i = 0; i < allTemps.length; i++) { //iterate through an array of objects for all the "tempAuthors" arrays and their ids in each paper
                for (var j = 0; j < allTemps[i].temps.length; j++) { //iterate through an array of all the objects in a tempAuthor array
                    var curArray = allTemps[i].temps;
                    var curObj = curArray[j]; //actual tempAuthor object
                    testArray.push({
                        "tempObj": curObj,
                        "respectivePaper": allTemps[i].paperID //the id of the paper for the above tempauthor object
                    }); //so now this is an array with a tempautthor object and the id for the paper that the tempauthor object belongs to
                }
            }
            var matchedAuthors = [];
            for (var i = 0; i < testArray.length; i++) { //find all the papers that may belong to this new author. If they match, put the tempObj and resp in the matched author array
                //then when you send it back to the client side, have the client display all those papers and ask them if they're theirs.
                var realFName = req.body.firstName.toLowerCase();
                var realLName = req.body.lastName.toLowerCase();
                var realSchool = req.body.school.toLowerCase();
                var fName = testArray[i].tempObj.firstName.toLowerCase();
                var lName = testArray[i].tempObj.lastName.toLowerCase();
                var school = testArray[i].tempObj.school.toLowerCase();
                //comparing strings testing labs: http://codepen.io/anon/pen/VervyZ
                if (realSchool === school || realSchool.indexOf(school) > -1 || school.indexOf(realSchool) > -1) { //schools have to  be the same or substrings (william vs great)
                    fNameScore = difference(soundex(realFName), soundex(fName));
                    lNameScore = difference(soundex(realLName), soundex(lName));
                    var finalScore = fNameScore + lNameScore;
                    //have to do all these because we want closest matches appearing first
                    if (finalScore == 8) {
                        matchedAuthors.push(testArray[i]);
                    } else if (finalScore == 7) {
                        matchedAuthors.push(testArray[i]);
                    } else if (finalScore == 6) {
                        matchedAuthors.push(testArray[i]);
                    } else if (finalScore == 5) {
                        matchedAuthors.push(testArray[i]);
                    } else if (finalScore == 4) { //what if they put their partner's chinese name and actual last name, but they put their american name? then the last name
                        //score will be 4, and first name 0, so we have to account for those people
                        matchedAuthors.push(testArray[i]);
                    }
                }
            }
            res.send(matchedAuthors);
        }
    });
});

app.post('/getPaper', function(req, res) {
    var pageSize = 6;
    if (req.body.filter == '' || req.body.filter == 'allTopics')
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
                            published: "true"
                        }, {
                            $or: searchObjectArray
                        }, {
                            subject: filter
                        }]
                    }, function(err, curs) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (req.body.len == "yes") //if looking for length
                                res.send({
                                len: curs.length
                            });
                            else {
                                if (curs.length < (req.body.page * pageSize)) { //if there are not enough papers to fill up the page
                                    res.send(curs.slice(pageSize * (req.body.page - 1), curs.length));
                                } else {
                                    res.send(curs.slice(req.body.page * pageSize - pageSize, req.body.page * pageSize));
                                }
                            }
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
                if (req.body.len == "yes")
                    res.send({
                        len: curs.length
                    });
                else
                    res.send(curs);
            }
        });
    } else if (req.body.searchType == 'every') {
        var searchObject = {};
    }
    if (req.body.searchType == 'Browse') {
        var searchObject = {};
    }
    if (req.body.searchType != "Author" && req.body.searchType != "id") {
        db.Papers.find({
            $and: [{
                    published: "true"
                },
                searchObject, {
                    subject: filter
                }
            ]
        }, function(err, curs) {
            if (err) {
                console.log(err);
            } else {
                if (req.body.len == "yes")
                    res.send({
                        len: curs.length
                    });
                else {
                    //curs is an array of paper objects

                    //first have to sort curs by our scoring system. if we don't sort them now then we'll only be sorting the papers we have on THAT results page.
                    curs.sort(function(a, b) {
                        return ((b.views + (b.upvotes * 25)) - (a.views + (a.upvotes * 25))); //score the papers by views + (upvotes*25), meaning each upvote counts for 25 views
                    });
                    if (curs.length < req.body.page * pageSize) //if there aren't enough papers to fill the page that the user is on
                        res.send(curs.slice(pageSize * (req.body.page - 1), curs.length));
                    else //if there are more than enough papers to fill the page that the user is on
                        res.send(curs.slice(req.body.page * pageSize - pageSize, req.body.page * pageSize));
                }
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
                    email: DOMPurify.sanitize(req.body.eml),
                    password: hash.generate(req.body.pwd),
                    name: DOMPurify.sanitize(req.body.fnm + " " + req.body.lnm),
                    lowerName: DOMPurify.sanitize(lowerName.toLowerCase()),
                    firstname: DOMPurify.sanitize(req.body.fnm),
                    lastname: DOMPurify.sanitize(req.body.lnm),
                    school: DOMPurify.sanitize(req.body.shl),
                    grade: DOMPurify.sanitize(req.body.grd),
                    isSummer: DOMPurify.sanitize(req.body.isSum),
                    referrer: DOMPurify.sanitize(req.body.referrer),
                    publications: [],
                    datejoined: DOMPurify.sanitize(req.body.dte)
                }, function(err, record) {
                    if (err) {
                        console.log(err);
                    } else {
                        var htm = fs.readFileSync('emailTemplate.html').toString();
                        var data = {
                            from: 'Scicademy <scicademy@scicademy.org>',
                            to: req.body.eml,
                            subject: 'Welcome to Scicademy!',
                            html: htm
                        };
                        res.send(record);
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

app.post('/sendReport', function(req, res) {
    var data = {
        from: 'Scicademy <scicademy@scicademy.org>',
        to: 'jesse.etan.smith@gmail.com',
        subject: 'Paper reported',
        html: DOMPurify.sanitize('User reported www.scicademy.org' + req.body.paperName + ' for this reason: ' + req.body.reportReason)
    };
    mailgun.messages().send(data, function(error, body) {
        console.log(body);
    });
    var data2 = {
        from: 'Scicademy <scicademy@scicademy.org>',
        to: 'abagh0703@gmail.com',
        subject: 'Paper reported',
        html: DOMPurify.sanitize('User reported www.scicademy.org' + req.body.paperName + ' for this reason: ' + req.body.reportReason)
    };
    mailgun.messages().send(data2, function(error, body) {
        console.log(body);
    });
});

app.post('/addPaper', function(req, res) {
    var searchObj = '';
    db.Papers.insert({
        title: DOMPurify.sanitize(req.body.title),
        authors: req.body.authors,
        abstract: DOMPurify.sanitize(req.body.abstract),
        keywords: DOMPurify.sanitize(req.body.keywords),
        subject: DOMPurify.sanitize(req.body.subject),
        institution: DOMPurify.sanitize(req.body.institution),
        tempAuthors: DOMPurify.sanitize(req.body.tempAuthors),
        upvotes: req.body.upvotes,
        upvoted: req.body.upvoted,
        views: req.body.views,
        pdf: DOMPurify.sanitize(req.body.pdf),
        date: DOMPurify.sanitize(req.body.date),
        published: "true"
    }, function(err, record) {
        if (err) {
            console.log(err);
        } else {
            try {
                db.Papers.findOne({
                    abstract: req.body.abstract
                }, function(err, doc) {
                    searchObj = {
                        "_id": doc._id
                    };
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
                            if (err)
                                console.log(err);
                            else
                                console.log(authorsOId);
                        });
                    }
                });
                res.send(record);
            } catch (err) {
                if (searchObj == '') {
                    res.send('');
                }
                db.Papers.update(
                    searchObj, {
                        $set: {
                            published: "false"
                        }
                    },
                    function(err, doc) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(' ');
                        }
                    }
                );
                res.send('');
            }
        }
    });
});

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
                    };
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
    var out = fs.createWriteStream(__dirname + '/public/uploads/' + req.body.query);
    s3.getObject(params).
    on('httpData', function(chunk) {
        out.write(chunk);
    }).
    on('httpDone', function() {
        out.end();
        res.send('http done');
    }).
    send();
});

app.post('/clearPdf', function(req, res) {
    fs.unlink(__dirname + '/public/uploads/' + req.body.query);
});
