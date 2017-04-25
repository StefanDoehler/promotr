var path = require('path');
var db = require('../model/database.js');

function getPromotions(req, res) {
	db.get_results();
};

module.exports = {
	getPromotions: getPromotions
};