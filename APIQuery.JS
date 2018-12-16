/* eslint-disable no-loop-func */
const mariadb = require('mariadb');
const request = require('request');

/* Sets the login information for the mariadb module */
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'editor',
	password: 'changeThePocket',
	database: 'obielocal'
});

/* Assuming there are always 2 pages of events on the API */
const numPages = 2;

/* The meat of the script. This establishes a connection and
prints out a message on success or failure. If it succeeds, it
calls the getEvents() function to pull from the API and
populate the database. */
pool.getConnection()
	.then(conn => {
		console.log("connected!");
		return conn.end();
	})
	.then(() => {
		return clearDatabase();
	})
	.then(() => {
		return getEvents(numPages);
	})
	.then(() => {
		pool.end();
	})

// TODO : Use 'verified' to determine whether an event can be wiped without
// checking its date. User created events will otherwise be wiped out every
// 6 hours!

/*Asynchronous function to delete events from database before updating from oberlin.calendar.edu*/
function clearDatabase() {
	return (
		pool.query(`DELETE FROM Events`)
	)
}

/* Uses the request module to send a request to the API and retrieve the JSON event
objects that are stored on each page. Then, it inserts the events into the database.
This should eventually be refactored into smaller, more manageable functions.
Future Work: Find a way to implement future events with this Api Query, 
'https://calendar.oberlin.edu/api/2/events?start=2018-12-15&end=2018-12-19&page=1' */
function getEvents(maxPages) {
	return new Promise(function(resolve, reject) {
		let pagesRemaining = maxPages;
		for (let page = 1; page <= maxPages; page++) {
			request(`https://calendar.oberlin.edu/api/2/events?page=${page}`, { json: true, timeout: 1500 }, (err, res, body) => {
	
				/* Upon request error, log the error and kill the process immediately.
				This should be reworked at some point. Calling process.exit() is
				kind of bad practice. */
				if (err) {
					console.log(err);
					process.exit(1);
					return;
				}
	
				/* If there are no events on the page, then make sure to count it as complete */
				console.log(`\nFound: ${body.events.length} events on page ${page}.\n`)
				if (body.events.length === 0) {
					pagesRemaining--;
				}

				if (pagesRemaining === 0) {
					resolve();
				}
	
				/* For each event found in the API's body */
				for (let i =0; i < body.events.length; i++){
					const event = body.events[i];
	
					/* Begin formatting of information so that it is ready
					to be inserted into the database. */
					const eventID = event.event["id"];
					let title = event.event["title"];
					if (title != null) {
						title = title.replace(/'/g,"''")
					}
					console.log(`Inserting event: ${title}.`);
					let created_at = event.event["created_at"];
					if (created_at != null) {
						created_at = created_at.substring(0,19).replace("T"," ")
					}
					let updated_at = event.event["updated_at"];
					if (updated_at != null) {
						updated_at = updated_at.substring(0,19).replace("T"," ")
					}
					let location_name = event.event["location_name"];
					if (location_name != null) {
						location_name = location_name.replace(/'/g,"''");
					}
					let created_by = event.event["created_by"];
					if (created_by != null) {
						created_by = created_by.toString();
					}
					const recurring = event.event["recurring"] ? 1 : 0;
					const free = event.event["free"] ? 1 : 0;
					let price = event.event["ticket_cost"];
					if (free === 1) {
						price = 0;
					} else {  // TODO: How does input look like if the even is not free. Perhaps use parseFLoat(price)
						price = price.replace("$", "");
						price = parseFloat(price);
					}
					const verified = event.event["verified"] ? 1 : 0;
					let venue_id = event.event["venue_id"];
					if (venue_id == null) {
						venue_id = 0;
					}
					let venue_url = event.event["venue_url"];
					if (venue_url != null) {
						venue_url = venue_url.replace(/'/g,"''");
					}
					/* filters should hold a JSON object? */
					let filters = event.event["filters"];
					// if (filters != null) {filters = filters.replace(/'/g,"''");}
					let description = event.event["description"];
					if (description != null) {
						description = description.replace(/'/g,"''");
					} // NOTE: returns html code
					let photo_url = event.event["photo_url"];
					if (photo_url != null) {
						photo_url = photo_url.replace(/'/g,"''");
					}
					let address = event.event["address"];
					if (address != null) {
						address = address.replace(/'/g,"''");
					}
					let latitude = event.event["geo"]["latitude"];
					if (latitude != null) {
						latitude = parseFloat(latitude);
					}
					let longitude = event.event["geo"]["longitude"];
					if (longitude != null) {
						longitude = parseFloat(longitude);
					}
	
					/* Begin insertion of event into database. If the INSERT query returns
					an error, the script will log it and continue on to the next event. At
					the end of all events, it will close the connection. */
					pool.query(
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
					/* Log the rows as they are inserted into the database.
					Upon reaching the final event, resolve the promise. */
					.then( rows => {
						console.log(rows);
						if (i === body.events.length - 1) pagesRemaining--;
						if (pagesRemaining === 0) {
							resolve();
						}
					})
					/* These errors are anticipated to be from duplicate 
					entries, so the loop will continue to reach every event. 
					Upon reaching the final event, resolve the promise. */
					.catch( err => {
						console.log(
							`ERROR: EventID: ${eventID}, code: ${err.code}, i: ${i}`
						);
						if (i === body.events.length - 1) pagesRemaining--;
						if (pagesRemaining === 0) {
							resolve();
						}
					});
				};
			});
		}
	});
}
