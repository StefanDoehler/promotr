// log.js

// based on http://stackoverflow.com/questions/17319395/node-js-pg-postgresql-and-insert-queries-app-hangs


/**
    Parse the group form the URL
    @param url, string, the URL
    @return int the numeric code for the group, or -1 if no group found
*/
function groupNo(url) {
    var ret=-1;
    if(url.length>=2) {
        ret=parseInt(url[:-2]);
    }
    return ret;
}

/**
    Log a visitor to the site
    @param ipaddr, string, the IP adress of the user
    @param groupno, int, the group number in which a user is a member, -1 is not
    in any group
    @param pageurl, string, the URL that the visitor sees
    @return 1 on completion, 0 otherwise
*/
function logUser(ipaddr, groupno, pageurl) {

    var pg = require('pg');
    var con = "postgres://sdoehler:skimboard@localhost:3000/promotr_db";

    pg.connect(con, function(err, client, done) {
    	if (err) {
    		console.log(err);
            console.log("Error 1: logUser in model/log.js");
    	}
    	else {
    		client.query("INSERT INTO visits (ipaddr,groupno,pageurl) VALUES ("+
                ipaddr+","+
                groupno+","+
                pageurl+
                ")",function(err, result) {
                    done();
        			if (err) {
                        console.log(err);
        				console.log("Error 2: logUser in model/log.js");
        			}
        			else {
                        // do nothing
        			}
                });
    	}
    });

}
