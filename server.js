var express = require('express');
var app = express();
var homepageController = require('./controller/welcome.js');

// the html
app.use(express.static(__dirname + 'view'));

// the css
app.use(express.static(__dirname + '/view/style'));

// homepage
app.get('/', homepageController.homepage);

app.listen(process.env.PORT || 3000);