const functions = require('firebase-functions');
const admin = require('firebase-admin');
var database = require('./handler');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

exports.refreshEvents = functions.pubsub
  .schedule('every 6 hours')
  .onRun(context => {
    let update = database
      .updateDatabase(db)
      .then(results => {
        console.log('No errors; database updated.');
        return results;
      })
      .catch(err => {
        console.error(err);
      });
    return update;
  });
