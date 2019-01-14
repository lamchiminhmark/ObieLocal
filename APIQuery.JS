/* eslint-disable no-loop-func */
const mariadb = require('mariadb');
const logins = require('./db_logins');
const request = require('request');

/* Sets the login information for the mariadb module */
const pool = mariadb.createPool(logins.editorPool);

/* Assuming there are always 2 pages of events on the API */
const NUM_PAGES = 2;

/* The meat of the script. This establishes a connection and
prints out a message on success or failure. If it succeeds, it
calls the getEvents() function to pull from the API and
populate the database. */
pool
  .getConnection()
  .then(conn => {
    console.log('Successfully connected!');
    return conn.end();
  })
  .then(() => {
    return clearDatabase();
  })
  .then(() => {
    return getEvents(NUM_PAGES);
  })
  .then(() => {
    pool.end();
  });

/**
 * Delete events from the database that are from the API or have already passed.
 */
function clearDatabase() {
  return pool.query(`DELETE FROM Events WHERE verified=1 OR end_time < NOW()`);
}

/* Uses the request module to send a request to the API and retrieve the JSON event
objects that are stored on each page. Then, it inserts the events into the database.
This should eventually be refactored into smaller, more manageable functions.
TODO: Find a way to implement *future* events using the following API: 
'https://calendar.oberlin.edu/api/2/events?start=2018-12-15&end=2018-12-19&page=1' */
function getEvents(maxPages) {
  return new Promise(function(resolve, reject) {
    let pagesRemaining = maxPages;
    for (let page = 1; page <= maxPages; page++) {
      request(
        `https://calendar.oberlin.edu/api/2/events?page=${page}`,
        { json: true, timeout: 1500 },
        (err, res, body) => {
          /* Upon request error, log the error and kill the process immediately.
					This should be reworked at some point. Calling process.exit() is
					kind of bad practice. */
          if (err) {
            console.log(err);
            process.exit(1);
            return;
          }

          /* If there are no events on the page, then make sure to count it as complete */
          console.log(
            `\nFound: ${body.events.length} events on page ${page}.\n`
          );
          if (body.events.length === 0) {
            pagesRemaining--;
          }

          if (pagesRemaining === 0) {
            resolve();
          }

          /* For each event found in the API's body */
          for (let i = 0; i < body.events.length; i++) {
            /* Format event object for insertion into the database */
            const event = formatEvent(body.events[i]);
            console.log(
              `Inserting event: ${event.title} with ID ${event.eventID}.`
            );

            /* Begin insertion of event into database. If the INSERT query returns
						an error, the script will log it and continue on to the next event. At
						the end of all events, it will close the connection. */
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
							longitude,
							start_time,
							end_time
						) VALUES (
							${event.eventID},
							'${event.title}',
							'${event.created_at}',
							'${event.updated_at}',
							'${event.location_name}',
							'${event.created_by}',
							'${event.recurring}',
							'${event.free}',
							${event.price},
							'1',
							'${event.venue_id}',
							'${event.venue_url}',
							'${event.filters}',
							'${event.description}',
							'${event.photo_url}',
							'${event.address}',
							${event.latitude},
							${event.longitude},
							${event.start_time},
							${event.end_time}
						)`
              )
              /* Log the rows as they are inserted into the database.
							Upon reaching the final event, resolve the promise. */
              .then(rows => {
                console.log(rows);
                if (i === body.events.length - 1) pagesRemaining--;
                if (pagesRemaining === 0) {
                  resolve();
                }
              })
              /* These errors are anticipated to be from duplicate
							entries, so the loop will continue to reach every event.
							Upon reaching the final event, resolve the promise. */
              .catch(err => {
                console.log(
                  `ERROR: EventID: ${event.eventID}, code: ${err.code}, i: ${i}`
                );
                if (i === body.events.length - 1) pagesRemaining--;
                if (pagesRemaining === 0) {
                  resolve();
                }
              });
          }
        }
      );
    }
  });
}

/**
 * Format a datetime so that it can be inserted into the database,
 * adjusted for the system's timezone.
 * @param {String} str The datetime string to be formatted.
 * @returns A string to be inserted via query.
 */
function formatDatetime(str) {
  const minuteToMilliseconds = 60000;
  let dateString = str;
  if (dateString != null) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setTime(date.getTime() - offset * minuteToMilliseconds);
    dateString = date.toISOString();
    dateString = `'${dateString.substring(0, 19).replace('T', ' ')}'`;
  } else {
    dateString = 'NULL';
  }
  return dateString;
}

/**
 * Format an event object so that it can be inserted into the
 * database.
 * @param {JSON} body The event object as retrieved from the API.
 * @returns An object with the necessary fields for the database.
 */
function formatEvent(body) {
  let event = JSON.parse(JSON.stringify(body));
  event.eventID = body.event.id;
  event.title = body.event.title;
  if (event.title != null) {
    event.title = event.title.replace(/'/g, "''");
  }
  event.created_at = body.event.created_at;
  if (event.created_at != null) {
    event.created_at = event.created_at.substring(0, 19).replace('T', ' ');
  }
  event.updated_at = body.event.updated_at;
  if (event.updated_at != null) {
    event.updated_at = event.updated_at.substring(0, 19).replace('T', ' ');
  }
  event.location_name = body.event.location_name;
  if (event.location_name != null) {
    event.location_name = event.location_name.replace(/'/g, "''");
  }
  event.created_by = body.event['created_by'];
  if (event.created_by != null) {
    event.created_by = event.created_by.toString();
  }
  event.recurring = body.event['recurring'] ? 1 : 0;
  event.free = body.event['free'] ? 1 : 0;
  event.price = body.event['ticket_cost'];
  if (isNaN(event.price) || event.free === 1) {
    event.price = 0;
  } else {
    event.price = event.price.replace('$', '');
    event.price = parseFloat(event.price);
  }
  event.venue_id = body.event['venue_id'];
  if (event.venue_id == null) {
    event.venue_id = 0;
  }
  event.venue_url = body.event['venue_url'];
  if (event.venue_url != null) {
    event.venue_url = event.venue_url.replace(/'/g, "''");
  }
  /* filters should hold a JSON eventect? */
  event.filters = JSON.parse(JSON.stringify(body.event['filters']));
  event.description = body.event['description'];
  if (event.description != null) {
    event.description = event.description.replace(/'/g, "''");
  } // NOTE: returns html code
  event.photo_url = body.event['photo_url'];
  if (event.photo_url != null) {
    event.photo_url = event.photo_url.replace(/'/g, "''");
  }
  event.address = body.event['address'];
  if (event.address != null) {
    event.address = event.address.replace(/'/g, "''");
  }
  event.latitude = body.event['geo']['latitude'];
  if (event.latitude != null) {
    event.latitude = parseFloat(event.latitude);
  }
  event.longitude = body.event['geo']['longitude'];
  if (event.longitude != null) {
    event.longitude = parseFloat(event.longitude);
  }

	// TODO: We will need to find a way to deal with multiple event instances
	// here.
  event.start_time =
    body.event['event_instances'][0]['event_instance']['start'];
  event.start_time = formatDatetime(event.start_time);

  event.end_time = body.event['event_instances'][0]['event_instance']['end'];
  event.end_time = formatDatetime(event.end_time);
  return event;
}
