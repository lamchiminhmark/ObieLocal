const functions = require('firebase-functions');

/**
 * Responds to a POST request to 'Like' a list of items
 * @param {Object} req Cloud Function request context. E.g
 * {method: 'POST,
    headers: {
        'Content-Type': 'application/json',
        },
    body: {userId: 1000, followeeId: 2000}}
 * @param {Object} res Cloud Function response context.
 */
module.exports.followRequestHandler = functions.https.onRequest(async (req, res) => {
  switch (req.method) {
    case 'PUT':
      res.status(403).send('Forbidden!');
      break;
    case 'POST': {
      let userId = req.body.userId;
      let followeeId = req.body.followeeId;
      if (userId && followeeId) {
        try {
          const userRef = await this.getUserFollowerRef(db,userId);
          const followeeRef = await this.getUserFollowerRef(db, followeeId);
          await followHandler(userRef, followeeRef);
        } catch (err) {
          console.error('Error handling follow http request!', err);
        }
      } else {
        res
          .status(405)
          .send({ error: 'userId, followeeId cannot be empty' });
      }
      break;
    }
    default:
      res.status(405).send({ error: 'Only POST request is allowed!' });
  }
});

/**
 * Retrieve user document reference from the database 'users'
 * @param {FirebaseFirestore.Firestore} db database instance from Functions
 * @param {number} userId
 * @returns {Promise<JSON[]>} all events in the databas
 */
module.exports.getUserFollowerRef = async function(db, userId) {
    let userRef = db.collection('userFollower').doc(userId);
    userRef.get().then(doc => {
    if (doc.exists) {
        return userRef;
    } else {
        throw new Error(`${userId} doesn't exist`);
      }
    }).catch(error => {
      throw new Error(`Error getting document: ${error.toString()}`)
    });
}

module.exports.addFollower = async function(userRef, followerRef){
  var followerArray = userRef.data().followers;
  followerArray = [...followerArray,followerRef.id];
  return userRef.update({followers: followerArray}).then(() => {
    return true;
  })
  .catch(error => {
    throw new Error(`Error updating document: ${error.toString()}`)
  })
}

module.exports.addFollowee = async function(userRef, followeeRef){
  var followeeArray = userRef.data().followees;
  followeeArray = [...followeeArray,followeeRef.id];
  return userRef.update({followees: followeeArray}).then(() => {
    return true;
  })
  .catch(error => {
    throw new Error(`Error updating document: ${error.toString()}`)
  })
}

async function addRequest(userRef, followeeRef){
  var requestArray = followeeRef.data().requests;
  requestArray = [...requestArray,userRef.id];
  return followeeRef.update({requests: requestArray}).then(() => {
    return true;
  })
  .catch(error => {
    throw new Error(`Error updating document: ${error.toString()}`)
  })
}

async function followHandler(userRef, followeeRef) {
  if (!followee.data().requestOn) {
    try {
      await addFollower(followeeRef, userRef);
      await addFollowee(userRef, followeeRef);
      console.log("Follow relationship written!")
    }
    catch (err) {
      throw new Error(`Error writing follow relationship: ${err}`)
    }
  }
  else {
    try {
      await addRequest(userRef, followeeRef);
      console.log("Request sent!");
    }
    catch (err) {
        throw new Error(`Error sending request: ${err}`)
    }
  }
}



