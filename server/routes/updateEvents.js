var express = require('express');
var router = express.Router();
var api = require('../APIQuery');

router.get('/', (req, res, next) => {
  try {
    api
      .updateDatabase()
      .then(() => {
        console.log('No errors in script.');
        res.sendStatus(200);
      })
      .catch(reason => {
        console.error('Update database / Promise Rejected: ' + reason);
        if (reason.code && reason.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
        }
        if (reason.code && reason.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.');
        }
        if (reason.code && reason.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.');
        }
        res.sendStatus(404);
      });
  } catch (err) {
    console.error('Error found in updateEvents' + err);
    res.sendStatus(500);
  }
});

module.exports = router;
