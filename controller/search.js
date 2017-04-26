var path = require('path');
var db = require('../model/database.js');

function getPromotions(req, res) {
	db.get_results(function(result) {
		res.send(result);
	});
};

module.exports = {
	getPromotions: getPromotions
};