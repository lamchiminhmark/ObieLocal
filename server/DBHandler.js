const mariadb = require('mariadb');
// This bit sets the login and database for the 'mariadb' module
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'viewer',
  password: 'checkoutOBL',
  database: 'obielocal'
});

// Establishes the connection and prints out a success/failure message
module.exports.tryConnection = function() {
  pool
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
    pool
      .query('SELECT * FROM Users')
      // .then(res => JSON.stringify(res))
      .catch(err => {
        console.log(err);
      })
  );
};

// Returns all of the rows in the Events table
module.exports.selectAllEvents = function() {
  return (
    pool
      .query('SELECT * FROM Events')
      // .then(rows => rows.map(item => item.username))
      // .then(res => JSON.stringify(res))
      .catch(err => {
        console.log(err);
      })
  );
};

// Inserts the JSON object 'event' into the correct fields of the
// database. Logs if there is an error. Does not do any validation.
module.exports.insertEvent = function(event) {
  return pool.query(
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
      ${event.id},
      '${event.title}',
      '${event.created_at}',
      '${event.updated_at}',
      '${event.location_name}',
      '${event.created_by}',
      '${event.recurring}',
      '${event.free}',
      ${event.price},
      '${event.verified}',
      '${event.venue_id}',
      '${event.venue_url}',
      '${event.filters}',
      '${event.description}',
      '${event.photo_url}',
      '${event.address}',
      ${event.latitude},
      ${event.longitude}
    )` 
  )
  .catch( err => {
    console.log(err);
  });
};
