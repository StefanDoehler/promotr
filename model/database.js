var pg = require('pg');

var db_url = 'postgres://ihoduluunhgcna:999e0ce412b6dea5ffd089320fe24546add865db6e38a7d380d2433130cf3651@ec2-54-235-120-27.compute-1.amazonaws.com:5432/d4d49k50c5p7dl'

function insert_promotion(params) {
	pg.defaults.ssl = true;
	pg.connect(db_url, function(err, client) {
		if (err) {
			return 0;
		}
		else {
			var query = "INSERT INTO locations (latitude, longitude) VALUES (" +
					parseFloat(params.lat).toFixed(3) + ", " +
					parseFloat(params.lon).toFixed(3) + ") RETURNING location_id;";
			client.query(query, function(err, result) {
				if (err) {
					console.log(err);
				}
				else {
					var loc_id = result.rows[0].location_id;
					var query = "INSERT INTO stores (store_name, store_location, description, business_type, promotion_type) VALUES ($1, $2, $3, $4, $5);";
					/*escapeSQL(params.store_name) + "', '" +   
					loc_id + "', '"  +
					escapeSQL(params.description) + "', '" +
					escapeSQL(params.store_type) + "', '" + 
					escapeSQL(params.promotion_type) + "');"; */
					console.log(query);
					client.query(query, [params.store_name, loc_id, params.description, params.store_type, params.promotion_type], function(err, result) {
						if (err) {
							console.log(err);
						}
						console.log("successfully added"); 
					});
				}
			});
		}
	});
}

function get_results() {
	pg.defaults.ssl = true;
	pg.connect(db_url, function(err, client, done) {
		var query = client.query("SELECT * FROM stores;");
		var rows = [];
		query.on('row', function(row, res) {
		    rows.push(row);
		});
		query.on('end', function(result) {
			console.log('db file getting rows...');
		});
	});
}

// destroys database and creates new one
function initialize_db() {
	pg.defaults.ssl = true;
	var db_url = 'postgres://ihoduluunhgcna:999e0ce412b6dea5ffd089320fe24546add865db6e38a7d380d2433130cf3651@ec2-54-235-120-27.compute-1.amazonaws.com:5432/d4d49k50c5p7dl'
	pg.connect(db_url, function(err, client) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('Connected to postgres...');

		var drop_query = 'DROP TABLE IF EXISTS stores, locations';
		var create_locations = 'CREATE TABLE locations (' +
		    'location_id bigserial primary key, ' +
		    'latitude float NOT NULL, ' +
		    'longitude float NOT NULL);';
		var create_stores = 'CREATE TABLE stores (' +
		    'store_id bigserial primary key, ' +
		    'store_name varchar(30) NOT NULL, ' +
		    'business_type varchar(20) NOT NULL, ' +
		    'promotion_type varchar(20) NOT NULL, ' +
		    'description varchar(150) NOT NULL, ' +
		    'store_location integer REFERENCES locations(location_id));';

		client
			.query(drop_query)
			.on('end', function(err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log('tables dropped');
			});

		client
			.query(create_locations)
			.on('end', function(err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log('locations table created');
			});

		client
			.query(create_stores)
			.on('end', function(err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log('stores table created');
				console.log('db initialization complete');
			});
	});
}

// http://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
function escapeSQL(str) 
{
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

module.exports = {
	insert_promotion: insert_promotion,
	get_results: get_results,
	initialize_db: initialize_db
}