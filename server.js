var express = require('express');
var body_parser = require('body-parser');
var app = express();
var navigateController = require('./controller/navigate.js');

// middle ware for POST method
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// the html
app.use(express.static(__dirname + 'view'));

// the css
app.use(express.static(__dirname + '/view/style'));

// js files
app.use(express.static(__dirname + '/controller'));
app.use(express.static(__dirname + '/model'));

// homepage
app.get('/', navigateController.homepage);

// promote page
app.get('/promote', navigateController.promote);

// add promotion to database
app.post('/submit_promotion', promoteController.submit);

// search page
app.get('/search', navigateController.search);

app.listen(process.env.PORT || 8000);