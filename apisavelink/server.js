/* Copyright (c) 2015, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   server.js
 *
 * DESCRIPTION
 *   The main entry point for the Node.js application. This sets up end points
 *   for static files, the application api, as well as the database for query
 *   result change notifications.
 *
 *****************************************************************************/

var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var serveStatic = require('serve-static');
var socketio = require('socket.io');
//
var app         = express();
var mongoose    = require('mongoose');
var morgan      = require('morgan');
var fs          = require("fs");
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config = require('./configs/config'); // get our config file mongodb
var User   = require('./models/user'); // get our mongoose model
//
// var app;
var httpServer;
var io;
var cors = require('cors');
var apiSr = [];
const routes = require('./routes');
const crypto = require('crypto');
// const fs = require("fs");

initWebServer();
function initWebServer() {
    httpServer = http.createServer(app);
	
	var options = {
	  key: fs.readFileSync('./certs/server.key'),
	  cert: fs.readFileSync('./certs/server.crt')
	};
	
	 var httpsServer = https.createServer(options, app);
	// Create an HTTPS service identical to the HTTP service.
	

	
    io = socketio(httpServer);
	io.setMaxListeners(0);
	// mongoose.connect(config.url); // connect to database
	app.use(cors());
	// app.use(cors({credentials: true, origin: 'https:10.103.18.35:3007'}));
    app.use(logger('combined'));
	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true }));
	//app.use(morgan('dev'));
	app.use('/api/', routes);
	
	 httpsServer.listen(3003, function() {
         console.log('Webserver listening on localhost:3003');  
	 });
	// https.createServer(options, app).listen(3007, function(){
		// console.log('webserver listening on localhost:3007');  
	// });
	//httpServer.listen(3003, function() {
    //    console.log('Webserver listening on localhost:3003');  
    //});    
}


  
 