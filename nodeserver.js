var http = require("http"),
	mongojs = require("mongojs"),
	fs = require("fs"),
	url = require("url");

var server = http.createServer(requestHandler);
server.listen(8888);

var uri = "mongodb://<dbuser>:<dbpassword>@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users"]);
console.log("node server running back end of app");
function requestHandler(request, response) {
	//request for user is .../getUser/<username>/<password>
	var path = url.parse(request.url).pathname;
	var details = path.split('/');
	if(details.indexOf("getUser") != -1) {
		console.log("recieved request for user");
		var user = db.Users.find({"email": details[details.indexOf("getUser") + 1],
	                              "password": details[details.indexOf("getUser") + 2]});
		user = user.toArray[0];
		response.writeHead(200, {"Content-Type": "text/json"});
		response.write(JSON.stringify(user));
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
