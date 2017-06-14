'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log("Great! App is ready and running.");
});
