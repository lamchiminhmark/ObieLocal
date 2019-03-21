const logins = require('./../db_logins');
const mysql = require('mysql');
var util = require('util');

// TODO: refactor so that validation happens inside of this
// script, not inside of the queries.js route.

// Set the login information for 'mariadb'.
const viewerPool = mysql.createPool(logins.viewerPool);
const editorPool = mysql.createPool(logins.editorPool);

viewerPool.query = util.promisify(pool.query);
editorPool.query = util.promisify(pool.query);


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
  viewerPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release();
    return
  })
};

// ML: Returns a promise with a resolved
// Returns all of the rows in the Users table
module.exports.selectAllUsers = function() {
  try {
      var result = await viewerPool.query('SELECT * FROM users')
  } catch(err) {
    throw new Error(err)
  }
  return result;
};

/**
 * Retrieve all of the rows in the Events table. Logs if there is an error.
 */
module.exports.selectAllEvents = function() {
  try {
    var result = await viewerPool.query('SELECT * FROM Events')
} catch(err) {
  throw new Error(err)
}
return result;
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
  try {
    var result = await editorPool.query(
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
      )`)
    } catch(err) {
      throw new Error(err)
    }
    return result;
};
