var path = require('path');

function search(req, res) {
	res.sendFile(path.join(__dirname, '../view/search_page.html'));
};

module.exports = {
	search: search
};