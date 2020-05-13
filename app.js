var express = require('express');
var app = express();

var path = require('path');
const dspAddon = require('./build/Release/dsp.node');

const EventEmitter = require('events').EventEmitter

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
	console.log("Running on port 3000");
});

function Main() {
    const emitter = new EventEmitter()

    emitter.on('start', () => {
        console.log( '### Sensor reading started ...');
    })

    emitter.on('sensor', (evt) => {
        // This module will be called as on when the
        // sensor1 data available for consuming from JS
        console.log(evt);
    })

    emitter.on('end', () => {
        console.log('### Sensor reading Ended');
    })

    dspAddon.getAudio( emitter.emit.bind(emitter) )
}

Main();

module.exports = dspAddon;