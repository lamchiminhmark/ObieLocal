/**
 * like-event.js
 * Cloud function to be called from client to call the 'Like' API
 *
 * Khang Nguyen
 * 4/26/2020
 */

const raccoonWrapper = require('./raccoon-wrapper');
const functions = require('firebase-functions');

/**
 * Responds to a POST request to 'Like' a list of items
 * @param {Object} req Cloud Function request context. E.g
 * {method: 'POST,
    headers: {
        'Content-Type': 'application/json',
        },
    body: {type: 'like', userId: 1703, items: ['Lecture', 'Computer Science']}}
 * body.type can be 'like', 'dislike', 'unlike' and 'undislike'
 * @param {Object} res Cloud Function response context.
 */
module.exports.rateEvent = functions.https.onRequest(async (req, res) => {
  switch (req.method) {
    case 'PUT':
      res.status(403).send('Forbidden!');
      break;
    case 'POST': {
      let userId = req.body.userId;
      let items = req.body.items;
      let type = req.body.type;
      if (userId && items && type) {
        try {
          //Create an array of async functions
          const asyncLikeFunctions = items.map(item =>
            rateItem(userId, item, type)
          );
          //Run all the send likes concurrently
          await Promise.all(asyncLikeFunctions);
          res.status(200).send('All ratings sent!');
        } catch (err) {
          console.error('Error sending ratings!', err);
        }
      } else {
        res
          .status(405)
          .send({ error: 'userId, items and type cannot be empty' });
      }
      break;
    }
    default:
      res.status(405).send({ error: 'Only POST request is allowed!' });
  }
});

/**
 * Call the Like API with the userId and itemId
 * @param {string} userId the ID of the user who liked
 * @param {string} itemId the list of the items that were liked
 * @param {string} ratingType can be 'like' 'dislike' 'unlike' and 'undislike'
 */
rateItem = async function(userId, itemId, ratingType) {
  try {
    await raccoonWrapper.rate(userId, itemId, ratingType);
  } catch (e) {
    console.error(e);
  }
  return;
};
