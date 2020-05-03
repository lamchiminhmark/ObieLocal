const functions = require('firebase-functions');
const admin = require('firebase-admin');
var database = require('./handler');
const { likeEvent } = require('./like-event');
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

exports.events = functions.https.onRequest((req, res) => {
  const query = database
    .getAllEvents(db)
    .then(arr => {
      res.status(200).send(JSON.stringify(arr));
      console.log(`Successfully returned array with ${arr.length} events.`);
      return arr;
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
  return query;
});

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

exports.likeEvent = functions.https.onRequest(likeEvent);
