var path = require('path');

function homepage(req, res) {
	res.sendFile(path.join(__dirname, '../view/homepage.html'));
};

module.exports = {
	homepage: homepage
};