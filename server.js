var express = require('express');
var app = express();
var homepageController = require('./controller/welcome.js');
var promoteController = require('./controller/promote.js');
var searchController = require('./controller/search.js');

// the html
app.use(express.static(__dirname + 'view'));

// the css
app.use(express.static(__dirname + '/view/style'));

// the javascript
app.use(express.static(__dirname + '/view/js'));

// homepage
app.get('/', homepageController.homepage);

// promote page
app.get('/promote', promoteController.promote);

// search page
app.get('/search', searchController.search);

app.listen(process.env.PORT || 8000);