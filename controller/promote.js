var path = require('path');

function promote(req, res) {
	res.sendFile(path.join(__dirname, '../view/promote_page.html'));
};

module.exports = {
	promote: promote
};