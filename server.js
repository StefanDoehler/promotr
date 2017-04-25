var express = require('express');
var app = express();
var navigateController = require('./controller/navigate.js');

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

// search page
app.get('/search', navigateController.search);

app.listen(process.env.PORT || 8000);