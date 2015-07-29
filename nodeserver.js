var http = require("http"),
	mongojs = require("mongojs"),
	fs = require("fs"),
	url = require("url");

var server = http.createServer(requestHandler);
server.listen(8888);

var uri = "mongodb://<dbuser>:<dbpassword>@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs.connect(uri, ["Papers", "Users"]);

function requestHandler(request, response) {
	//request for user is .../getUser/<firstname>/<lastname>/<school>
	var path = url.parse(request.url).pathname;
	var details = path.split('/');
	if(details.indexOf("getUser") != -1) {
		console.log("recieved request for user");

		var user = db.Users.find({"firstname": details[details.indexOf("getUser") + 1],
	                            	"lastname": details[details.indexOf("getUser") + 2],
	                            	"school": details[details.indexOf("getUser") + 3]});
		user = user.toArray[0];
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(user);
	}
	else {
		fs.readFile("./index.html", function(err, file) {
			if(err) {
				return;
			}
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(file, "utf-8");
		});
	}
}
