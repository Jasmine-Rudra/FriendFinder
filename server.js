// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  	// res.send("Welcome to the Star Wars Page!")
  	res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "survey.html"));
});
app.get("/api/", function(req, res) {
	fs.readFile(path.join(__dirname, "friends.js"), "utf8", function(err, data){
		if(err){
			return console.log(err);
		}
		var friends = JSON.parse(data);
		console.log(data);
		return res.json(friends);
	});
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});