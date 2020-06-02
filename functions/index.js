const functions = require('firebase-functions');
const admin = require('firebase-admin');
var database = require('./handler');
const { rateEvent } = require('./rate-event');
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

exports.rateEvent = rateEvent;

async function updateRecommendations() {
  const LIMIT = 10;
  const RECOMMENDATION = [
    'Conservatory of Music',
    'Composition',
    'Undergraduate Research'
  ];
  const attrScore = {};
  const relevanceScore = {};
  const eventIds = []
  RECOMMENDATION.forEach((attr, i, arr) => {
    attrScore[attr] = length(arr) - i    // 1st attr in length-3 array scores 3, 
  })                                     // 2nd scores 2 and 3rd scores 1
  const querySnapshot = await db.collection('events').get();
  querySnapshot.forEach(documentSnapshot => {
    const eventId = documentSnapshot.id;
    eventIds.push(eventId);
    // eventFilters: {departments: Array<{id: string, name: string}>, 
    //                event_types: Array<{id: string, name: string}>}
    const eventFilters = documentSnapshot.get('filters');
    const attributes = eventFilters
      .departments
      .concat(eventFilters.event_types)
      .map(attrObj => attrObj.name);
    relevanceScore[eventId] = attributes.reduce(
      (total, current) => total + (attrScore[current] || 0),
      0
    );
  })
  eventId.sort((id1, id2) => relevanceScore[id2] - relevanceScore[id1]);
  // TODO(ML): Write top 10 to person's events.recommendation
}