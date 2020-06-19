/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const rp = require('request-promise');
const admin = require('firebase-admin');

/**
 * Deletes all events in the database and then
 * inserts all events from the API into the database.
 * @param {FirebaseFirestore.Firestore} db a database instance
 * @returns {Promise<Promise<FirebaseFirestore.DocumentReference>[]>} all inserted document references
 */
module.exports.updateDatabase = async function(db) {
  try {
    await clearDatabase(db);
    return insertAPIEventsToDatabase(db);
  } catch (e) {
    return e;
  }
};

// TODO: Lost functionality here on transfer to Firestore. This should delete
// any events that (a) have already passed, or (b) are from the API.

/**
 * Deletes all events from the database.
 * @param {FirebaseFirestore.Firestore} db the database instance from functions
 * @returns {Promise<FirebaseFirestore.WriteResult>[]}
 */
async function clearDatabase(db) {
  try {
    let docs = [];
    await db
      .collection('events')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          docs.push(doc.id);
        });
        return snapshot;
      })
      .catch(err => {
        console.log(err);
      });

    let results = [];
    for (let id of docs) {
      results.push(
        db
          .collection('events')
          .doc(id)
          .delete()
      );
    }
    return Promise.all(results);
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Uses the request module to send a request to the API and retrieve the JSON event
 * objects that are stored on each page. Then, it inserts the events into the database.
 * TODO: Refactor into smaller, more manageable functions.
 * 'https://calendar.oberlin.edu/api/2/events?start=2018-12-15&end=2018-12-19&page=1'
 * @param {FirebaseFirestore.Firestore} db Firestore instance
 * @returns {Promise<Promise<FirebaseFirestore.DocumentReference>[]>}
 */
async function insertAPIEventsToDatabase(db) {
  let promises = [];
  let options = {
    json: true,
    timeout: 1500,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    uri: 'https://calendar.oberlin.edu/api/2/events?days=8'
  };

  let body = await rp(options).catch(err => {
    console.log(err);
    return null;
  });
  let numPages = (pagesRemaining = body ? body.page.total : 10);

  for (let page = 1; page <= numPages; page++) {
    options.uri = `https://calendar.oberlin.edu/api/2/events?days=8&page=${page}`;

    try {
      body = await rp(options);
    } catch (e) {
      console.error(e);
      throw e;
    }

    /* If there are no events on the page, then make sure to count it as complete */
    console.log(`\nFound: ${body.events.length} events on page ${page}.\n`);
    if (body.events.length === 0) {
      pagesRemaining--;
    }

    if (pagesRemaining === 0) {
      break;
    }

    for (let i = 0; i < body.events.length; i++) {
      /* Format event object for insertion into the database */
      const event = formatEvent(body.events[i]);

      const added = db
        .collection('events')
        .add(event)
        .then(doc => {
          console.log(`Inserted event: ${event.title} with id: ${doc.id}`);
          return doc;
        })
        .catch(err => {
          console.error(`Error inserting event: ${event}`);
          console.error(err);
          return err;
        });
      promises.push(added);

      if (i === body.events.length - 1) pagesRemaining--;
      if (pagesRemaining === 0) {
        break;
      }
    }
  }
  return Promise.all(promises);
}

/**
 * Format a datetime so that it can be inserted into the database,
 * adjusted for the system's timezone.
 * @param {String} str The datetime string to be formatted.
 * @returns {Date} A string to be inserted via query.
 */
function getEventDate(str) {
  if (!str) return null;
  const minuteToMilliseconds = 60000;

  const date = new Date(str);
  const offset = date.getTimezoneOffset();
  date.setTime(date.getTime() - offset * minuteToMilliseconds);
  return date;
}

/**
 * Format an event object so that it can be inserted into the
 * database.
 * @param {JSON} body The event object as retrieved from the API.
 * @returns {JSON} Object to be inserted into the database.
 */
function formatEvent(body) {
  let formattedEvent = {};
  formattedEvent.eventID = body.event.id;
  if (body.event.title) {
    formattedEvent.title = body.event.title.replace(/'/g, "''");
  }
  if (body.event.created_at) {
    formattedEvent.created_at = body.event.created_at
      .substring(0, 19)
      .replace('T', ' ');
  }
  if (body.event.updated_at) {
    formattedEvent.updated_at = body.event.updated_at
      .substring(0, 19)
      .replace('T', ' ');
  }
  if (body.event.location_name) {
    formattedEvent.location_name = body.event.location_name.replace(/'/g, "''");
  }
  if (body.event['created_by']) {
    formattedEvent.created_by = body.event.created_by.toString();
  }
  formattedEvent.recurring = body.event['recurring'] ? 1 : 0;
  formattedEvent.free = body.event['free'] ? 1 : 0;
  formattedEvent.price = body.event['ticket_cost'];
  if (isNaN(body.event.price) || body.event.free === 1) {
    formattedEvent.price = 0;
  } else {
    formattedEvent.price = parseFloat(body.event.price.replace('$', ''));
  }
  formattedEvent.verified = body.event.verified;
  if (!body.event['venue_id']) {
    formattedEvent.venue_id = 0;
  }
  if (body.event['venue_url']) {
    formattedEvent.venue_url = body.event.venue_url.replace(/'/g, "''");
  }
  /* filters should hold a JSON eventect? */
  formattedEvent.filters = JSON.parse(JSON.stringify(body.event['filters']));
  if (body.event['description']) {
    formattedEvent.description = body.event['description'].replace(/'/g, "''");
  } // NOTE: returns html code
  if (body.event['photo_url']) {
    formattedEvent.photo_url = body.event['photo_url'].replace(/'/g, "''");
  }
  if (body.event['address']) {
    formattedEvent.address = body.event['address'].replace(/'/g, "''");
  }
  if (body.event['geo']['latitude']) {
    formattedEvent.latitude = parseFloat(body.event['geo']['latitude']);
  }
  if (body.event['geo']['longitude']) {
    formattedEvent.longitude = parseFloat(body.event['geo']['longitude']);
  }

  // TODO: We will need to find a way to deal with multiple event instances
  // here.

  if (body.event['event_instances'][0]['event_instance']['start'])
    formattedEvent.start_time = admin.firestore.Timestamp.fromDate(
      getEventDate(body.event['event_instances'][0]['event_instance']['start'])
    );

  if (body.event['event_instances'][0]['event_instance']['end'])
    formattedEvent.end_time = admin.firestore.Timestamp.fromDate(
      getEventDate(body.event['event_instances'][0]['event_instance']['end'])
    );

  return formattedEvent;
}
