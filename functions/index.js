const functions = require('firebase-functions');
const raccoonWrapper = require('./raccoon-wrapper');
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

exports.updateRecommendations = async function updateRecommendations(userId) {
  const attrScore = await raccoonWrapper.recommend(userId);
  const relevanceScore = {};
  let eventIds = [];
  const querySnapshot = await db.collection('events').get();
  querySnapshot.forEach(documentSnapshot => {
    const eventId = documentSnapshot.id;
    eventIds.push(eventId);
    // eventFilters: {departments: Array<{id: string, name: string}>, 
    //                event_types: Array<{id: string, name: string}>}
    const eventFilters = documentSnapshot.get('filters');
    eventFilters.departments = eventFilters.departments || [];
    eventFilters.event_types = eventFilters.event_types || [];
    const attributes = eventFilters
      .departments
      .concat(eventFilters.event_types)
      .map(attrObj => attrObj.name);
    relevanceScore[eventId] = attributes.reduce(
      (total, current) => total + (attrScore[current] || 0),
      0
    );
  })
  eventIds = eventIds.filter(id => relevanceScore[id] > 0)
  eventIds.sort((id1, id2) => relevanceScore[id2] - relevanceScore[id1]);
  const res = await db.collection('users').doc(userId).update({ events: { recommended: eventIds.slice(0, 10) } });
  console.log(res);
}