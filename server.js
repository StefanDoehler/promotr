var express = require('express');
var body_parser = require('body-parser');
var pg = require('pg');
var app = express();
var navigateController = require('./controller/navigate.js');
var promoteController = require('./controller/promote.js');
var searchController = require('./controller/search.js');
var db_url = 'postgres://ihoduluunhgcna:999e0ce412b6dea5ffd089320fe24546add865db6e38a7d380d2433130cf3651@ec2-54-235-120-27.compute-1.amazonaws.com:5432/d4d49k50c5p7dl'


// middle ware for POST method
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// the html
app.use(express.static(__dirname + 'view'));

// the css
app.use(express.static(__dirname + '/view/style'));

// js files
app.use(express.static(__dirname + '/view/js'));

// homepage
app.get('/', navigateController.homepage);

// initialize db
app.get('/setup', navigateController.setup_db);

// promote page
app.get('/promote', navigateController.promote);

// add promotion to database
app.post('/promote/submit', promoteController.submit);

// search page
app.get('/search', navigateController.search);

// get results
app.get('/search/results', function(req, res) {
	pg.defaults.ssl = true;
	pg.connect(db_url, function(err, client, done) {
		var query = client.query("SELECT * FROM stores;");
		var rows = [];
		query.on('row', function(row, res) {
		    rows.push(row);
		});
		query.on('end', function(result) {
			console.log('trying to get rows...');
			console.log(rows);
			console.log('done');
			res.send(rows);
		});
	});
});

console.log("app up and running");

app.listen(process.env.PORT || 8000);