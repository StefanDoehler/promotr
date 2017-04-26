var path = require('path');
var db = require('../model/database.js');

function homepage(req, res) {
	//logUser(req.connection.remoteAddress,groupNo(req.url),req.url);
	res.sendFile(path.join(__dirname, '../view/homepage.html'));
};

function promote(req, res) {
	//logUser(req.connection.remoteAddress,groupNo(req.url),req.url);
	res.sendFile(path.join(__dirname, '../view/promote_page.html'));
};

function search(req, res) {
	//logUser(req.connection.remoteAddress,groupNo(req.url),req.url);
	res.sendFile(path.join(__dirname, '../view/search_page.html'));
};

function setup_db(req, res) {
	db.initialize_db();
}

module.exports = {
	homepage: homepage,
	promote: promote,
	search: search,
	setup_db: setup_db
};
