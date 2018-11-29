const mariadb = require('mariadb');

// This bit sets the login and database for the 'mariadb' module
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'editor',
	password: 'changeThePocket',
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

	// This bit uses the 'request' module to grab the json object from calendar.oberlin.edu API
const request = require('request');
request('https://calendar.oberlin.edu/api/2/events', { json: true }, (err, res, body) => {
     if (err) { return console.log(err); }
		 //console.log(body.events.length)
     for (let i =0; i < body.events.length; i++){
				const event = body.events[i];

				//retrieve relevant information and format appropriately
				const eventID = event.event["id"];
				let title = event.event["title"];
				if (title != null) {title = title.replace("'","''")}
			  console.log(title);
			  let created_at = event.event["created_at"];
				if (created_at != null) {created_at = created_at.substring(0,19).replace("T"," ")}
			  let updated_at = event.event["updated_at"];
				if (updated_at != null) {updated_at = updated_at.substring(0,19).replace("T"," ")}
			  let location_name = event.event["location_name"];
				if (location_name != null) {location_name = location_name.replace("'","''");}
			  let created_by = event.event["created_by"];
				if (created_by != null) {created_by = created_by.toString();}
			  const recurring = event.event["recurring"] ? 1 : 0;
			  const free = event.event["free"] ? 1 : 0;
			  let price = event.event["ticket_cost"];
				if (free === 1) { price = 0;} else {price = parseFloat(price);} //TODO: How does input look like if the even is not free. Perhaps use parseFLoat(price)
			  const verified = event.event["verified"] ? 1 : 0;
			  let venue_id = event.event["venue_id"];
			  if (venue_id == null) {venue_id = 0;}
			  let venue_url = event.event["venue_url"];
				if (venue_url != null) {venue_url = venue_url.replace("'","''");}
				/* filters should hold a JSON object? */
			  let filters = event.event["filters"];
				//if (filters != null) {filters = filters.replace("'","''");}
			  let description = event.event["description"];
				if (description != null) {description = description.replace("'","''");} //NOTE: returns html code
			  let photo_url = event.event["photo_url"];
				if (photo_url != null) {photo_url = photo_url.replace("'","''");}
			  let address = event.event["address"];
				if (address != null) {address = address.replace("'","''");}
				let latitude = event.event["geo"]["latitude"];
				if (latitude != null) {latitude = parseFloat(latitude);}
				let longitude = event.event["geo"]["longitude"];
				if (longitude != null) {longitude = parseFloat(longitude);}

				// Insert data into our database
				pool
					.query( 
						`INSERT INTO Events (
							ID, 
							title, 
							created_at, 
							updated_at, 
							location_name, 
							created_by, 
							recurring, 
							free, 
							price, 
							verified, 
							venue_id, 
							venue_url, 
							filters, 
							description, 
							photo_url, 
							address, 
							latitude, 
							longitude 
						) VALUES (
							${eventID},
							'${title}',
							'${created_at}',
							'${updated_at}',
							'${location_name}',
							'${created_by}',
							'${recurring}',
							'${free}',
							${price},
							'${verified}',
							'${venue_id}',
							'${venue_url}',
							'${filters}',
							'${description}',
							'${photo_url}',
							'${address}',
							${latitude},
							${longitude}
						)` 
					)
					.then( rows  => {
					  console.log(rows);
					  //rows.forEach(row => console.log(row));
					})
					.catch( err => {
				 	 console.log(err);
					});
    };
})
