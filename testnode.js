const mariadb = require('mariadb');

// This bit sets the login and database for the 'mariadb' module
const pool = mariadb.createPool({
	host: 'localhost', 
	user: 'viewer', 
	password: 'checkoutOBL', 
	database: 'obielocal'
});

// This establishes the connection and prints out a success/failure message
pool.getConnection()
        .then(conn => {
                console.log("connected! connection id is " + conn.threadId);
                conn.end(); // release to pool
        })
        .catch(err => {
          console.log("not connected due to error: " + err);
        });
	console.log('hi');


// This bit shows what returns when we query a table from the database
pool
	.query( "SELECT * FROM Users" )
	.then( rows  => {
	  console.log(rows);
	  //rows.forEach(row => console.log(row));
	})
	.catch( err => {
 	 console.log(err);
	});

// This bit uses the 'request' module to grab the json object from calendar.oberlin.edu API
const request = require('request');
request('https://calendar.oberlin.edu/api/2/events', { json: true }, (err, res, body) => {
     if (err) { return console.log(err); }
     for (var i =0; i < body.events.length; i++){
        console.log(body.events[i].event["title"]);
    };
})

