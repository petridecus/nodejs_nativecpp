var express = require('express');
var app = express();
var path = require('path');
var execFile = require('child_process').execFile

var child = execFile("./dspapp/dsp", [], function(error, stdout, stderr) {
	console.log("Here is the complete output of the program: ");
	console.log(stdout)
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3003, function() {
	console.log("app is working");
});
