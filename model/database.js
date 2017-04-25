var pg = require('pg');

function insert_promotion(params) {
	var con = "postgres://sdoehler:skimboard@localhost:3000/promotr_db";
	pg.connect(con, function(err, client, done) {
		if (err) {
			return 0;
		}
		else {
			var query = "INSERT INTO locations (latitude, longitude) VALUES (" +
					parseFloat(params.lat).toFixed(3) + ", " +
					parseFloat(params.lon).toFixed(3) + ") RETURNING location_id;";
			client.query(query, function(err, result) {
				done();
				if (err) {
					return 0;
				}
				else {
					var loc_id = result.rows[0].location_id;
					var query = "INSERT INTO stores (store_name, store_location, description, business_type, promotion_type) VALUES ('" +
						params.store_name + "', '" +
						loc_id + "', '" +
						params.description + "', '" +
						params.store_type + "', '" +
						params.promotion_type + "');";
					console.log(query);
					client.query(query, function(err, result) {
						done();
						if (err) {
							return 0;
						}
					});
				}
			});
		}
	});

	return 1;
}

module.exports = {
	insert_promotion: insert_promotion
}