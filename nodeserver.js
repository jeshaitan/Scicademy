var http = require("http");
var mongojs = require("mongojs");

var server = http.createServer(requestHandler);
server.listen(8888);

var uri = "mongodb://<dbuser>:<dbpassword>@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs.connect(uri, ["Papers", "Users"]);

function requestHandler(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	
}