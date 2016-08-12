/// <reference path="./typings/index.d.ts" />

import express = require('express');
// import BaseRoutes = require("./config/routes/Routes");
import bodyParser = require("body-parser");

import path = require('path');
var port: number = process.env.PORT || 8080;
var app = express();

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods',['GET','POST','PUT']);
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use('/public', express.static(path.resolve(__dirname, '../client')));
app.use('/node_modules', express.static(path.resolve(__dirname,'../../node_modules')));
app.use('/app', express.static(path.resolve(__dirname, '../client/app')));

app.use(bodyParser.json());
// app.use('/api', new BaseRoutes().routes);

var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
}
// running a second test

// test this
app.get('/*', renderIndex);

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});
