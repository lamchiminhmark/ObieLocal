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
