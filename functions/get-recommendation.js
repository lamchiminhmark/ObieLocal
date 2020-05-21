const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

/**
 * Returns an ordered list of recommended events
 * @param {string} idToken of the user for whom recommendation
 * is for
 */
const getRecommendation = functions.https.onRequest(async (req, res) => {
  try {
    const idToken = req.body.idToken;
    if (!idToken)
      res.status(405).send({ error: 'idToken must be included in body' });
    const uid = await admin.auth().verifyIdToken(idToken);
    const behaviorRec = await getBehaviorRecList(uid);
    const socialRec = await getSocialRecList(uid);
    const interestRec = await getInterestRecList();
    console.log(behaviorRec, socialRec);
  } catch (err) {
    console.error('Error sending ratings!', err);
  }
});

/**
 * TODO(ML): Error handling
 * Gets the recommendation list based on collaborative filtering
 * @param {string} userId
 */
async function getBehaviorRecList(userId) {
  const docRef = db.collection('event-orders').doc(userId);
  try {
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(
        `Looking for rec document ${userId}, which doesn't exist.`
      );
    } else return doc.data().events;
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * TODO(ML): Benchmark the relevant event finding algorithm to find out how it
 * scales when we recommend people events in a 3 day time range (21 events) and
 * if a person follows everyone else in a large university (30K follows)
 */
async function getSocialRecList(userId) {
  const followingRef = db.collection('user-follows').doc(userId);
  const eventsSnapshot = db.collection('events').get();
  try {
    let following;
    let relevantEvents = []; // Events that people I am following are interested in
    const doc = await followingRef.get();
    if (!doc.exists) {
      throw new Error(
        `Looking for "following" document ${userId}, which doesn't exist.`
      );
    } else following = doc.data().following;
    // Generate list of relevant events
    const followingSet = new Set(following);
    eventsSnapshot.forEach(doc => {
      const interested = doc.data().interested;
      for (const user in interested) {
        if (user in followingSet) {
          relevantEvents.push(doc);
          return;
        }
      }
    });
    return relevantEvents;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { getRecommendation, getBehaviorRecList, getSocialRecList };
