var express = require('express');
var app = express();

var path = require('path');

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var spawn = require('child_process').spawn
var child = spawn('./dspapp/dsp');

console.log(child.pid);

child.stdin.end('12 34 56');
child.stdout.on('data', data => {
	var message = decoder.write(data);
	console.log(message.trim());
});
child.on('close', code => { 
	console.log('Exit code: ' + code)
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
	console.log("Running on port 3000");
});
