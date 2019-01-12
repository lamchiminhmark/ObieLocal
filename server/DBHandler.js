const logins = require('./../db_logins');
const mariadb = require('mariadb');

// TODO: refactor so that validation happens inside of this
// script, not inside of the queries.js route.

// Set the login information for 'mariadb'.
const viewerPool = mariadb.createPool(logins.viewerPool);
const editorPool = mariadb.createPool(logins.editorPool);

const fieldList = [
  'ID',
  'title',
  'created_at',
  'updated_at',
  'location_name',
  'created_by',
  'recurring',
  'free',
  'price',
  'verified',
  'venue_id',
  'venue_url',
  'filters',
  'description',
  'photo_url',
  'address',
  'latitude',
  'longitude',
  'start_time',
  'end_time'
];

// Establishes the connection and prints out a success/failure message
module.exports.tryConnection = function() {
  viewerPool
    .getConnection()
    .then(conn => {
      console.log('connected! connection id is ' + conn.threadId);
      conn.end(); // release to pool
    })
    .catch(err => {
      console.log('not connected due to error: ' + err);
    });
};

// ML: Returns a promise with a resolved
// Returns all of the rows in the Users table
module.exports.selectAllUsers = function() {
  return (
    viewerPool
      .query('SELECT * FROM Users')
      // .then(res => JSON.stringify(res))
      .catch(err => {
        console.log(err);
      })
  );
};

/**
 * Retrieve all of the rows in the Events table. Logs if there is an error.
 */
module.exports.selectAllEvents = function() {
  return (
    viewerPool
      .query('SELECT * FROM Events')
      // .then(rows => rows.map(item => item.username))
      // .then(res => JSON.stringify(res))
      .catch(err => {
        console.log(err);
      })
  );
};

/**
 * Inserts an event object into the Events table. Logs if there is an error.
 * Does not do any validation.
 * @param event The event object.
 */
module.exports.insertEvent = function(event) {
  /* Check for any undefined fields, and create them with 'NULL'
  or 'DEFAULT if they are found. */
  for (let i = 0; i < fieldList.length; i++) {
    const field = fieldList[i];
    if (event[field] === undefined) {
      switch (field) {
        case 'ID':
        case 'recurring':
        case 'free':
        case 'verified':
          event[field] = 'DEFAULT';
          break;
        default:
          event[field] = 'NULL';
      }
    }
  }

  return editorPool.query(
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
        ${event.ID},
        ${event.title},
        ${event.created_at},
        ${event.updated_at},
        ${event.location_name},
        ${event.created_by},
        ${event.recurring},
        ${event.free},
        ${event.price},
        ${event.verified},
        ${event.venue_id},
        ${event.venue_url},
        ${event.filters},
        ${event.description},
        ${event.photo_url},
        ${event.address} ,
        ${event.latitude},
        ${event.longitude},
        ${event.start_time},
        ${event.end_time}
      )`
  );
};
