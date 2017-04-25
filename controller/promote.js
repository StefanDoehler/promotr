var path = require('path');

function submit(req, res) {
	res.sendFile(path.join(__dirname, '../view/homepage.html'));
};

module.exports = {
	submit: submit
};