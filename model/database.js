var pg = require('pg');

var con = "postgres://sdoehler:skimboard@localhost:3000/promotr_db";
pg.connect(con, function(err, client, done) {
	if (err) {
		console.log(err);
	}
	else {
		client.query("SELECT * FROM stores", function(err, result) {
			done();
			if (err) {
				console.log("query error");
			}
			else {
				console.log(result.rows[1]);
			}
		});
	}
});
