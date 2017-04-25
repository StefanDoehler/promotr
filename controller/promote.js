var path = require('path');
var db = require('../model/database.js');
var navigateController = require('../controller/navigate.js');

function submit(req, res) {
	db.insert_promotion(req.body);
};

module.exports = {
	submit: submit
};