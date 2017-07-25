// -------------------------------------------------- //
// Load dependencies
// -------------------------------------------------- //
var dotenv = require('dotenv').config();
var express = require('express');
var session = require('express-session');
var request = require('request');


// -------------------------------------------------- //
// Set up Express and middleware
// -------------------------------------------------- //
var app = express();

	// We will use the session ID as the state parameter 
	// to ensure the user made the authorization request
	app.use(session({
		secret: 'plangrid',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // default to 7 days
	}));


// -------------------------------------------------- //
// Set up routes
// -------------------------------------------------- //

	// This is the default route.
	// It will ask users to click the "Connect to PlanGrid" button
	app.use(express.static(__dirname + '/public'));
	app.get('/', function (req, res) {
		res.redirect('/index.html');
	});


	// First step of OAuth flow:
	// Redirect user to authorization endpoint
	app.get('/authorize', function (req, res) {
		// construct the GET URL
		var authorizeURL = 'https://io.plangrid.com/oauth/authorize?response_type=code' +
							'&client_id=' + process.env.CLIENT_ID +
							'&redirect_uri=' + process.env.REDIRECT_URI +
							'&state=' + req.sessionID;

		// redirect the user to the authorization URL
		res.redirect(authorizeURL);
	});


	// Once authorized by user, use authorization_code to request access_token
	app.get('/callback', function (req, res) {

		// check if an authorization code was passed back
		if (req.query.code){

			// ensure the request was made by this user by matching the state and sessionID
			if (req.query.state === req.sessionID){

				// the parameters that will be passed to the /oauth/token endpoint
				var requestObject = {
					'client_id': process.env.CLIENT_ID,
					'client_secret': process.env.CLIENT_SECRET,
					'grant_type': 'authorization_code',
					'code': req.query.code,
					'redirect_uri': process.env.REDIRECT_URI
				};

				// set up the POST request
				var options = {
					method: 'POST',
					url: process.env.TOKEN_HOST,
					form: requestObject,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
				};

				// make the POST request
				request(options, function (error, response, body) {
					if (!error) {
						// if no errors, pass the access token
						var token = JSON.parse(body);
						res.send(token);
					} else {
						// else display error
						res.send("Error requesting access token: ", error);
					}
				});

			} else {
				res.send("The request made does not match this session.");
			}

		} else {
			res.send("No authorization code was provided.");
		}
	});


// -------------------------------------------------- //
// Start Express server
// -------------------------------------------------- //
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server listening on port ' + process.env.PORT || 3000);
});