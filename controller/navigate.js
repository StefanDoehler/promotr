var path = require('path');

function homepage(req, res) {
	res.sendFile(path.join(__dirname, '../view/homepage.html'));
};

function promote(req, res) {
	res.sendFile(path.join(__dirname, '../view/promote_page.html'));
};

function search(req, res) {
	res.sendFile(path.join(__dirname, '../view/search_page.html'));
};

module.exports = {
	homepage: homepage,
	promote: promote,
	search: search
};