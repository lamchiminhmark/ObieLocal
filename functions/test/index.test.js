const test = require('firebase-functions-test')(
  {
    projectId: 'test-twine-12451'
  },
  'test/test-twine-12451-69359364facf.json'
);
const assert = require('chai').assert;
const redis = require('redis');
const admin = require('firebase-admin');

// Importing functions
const raccoonWrapper = require('../raccoon-wrapper');

// whole app is loaded so that admin is already initialized
const { rateEvent, updateRecommendations } = require('../index.js');

const USER_ID_1 = '10';
const ITEM_ID_1 = 'Lecture';
const ITEM_ID_2 = 'Computer science';
const MARK_USER_ID = '1FX9PWN8H4TreVGKEwoxxrXLWCc2';
const MUSIC_ID = 'Music';
const UNDERGRADUATE_RESEARCH_ID = 'Undergraduate Research';

// Global setup
const db = admin.firestore();

describe('rateEvent', () => {
  afterEach(done => {
    const client = redis.createClient();
    client.flushall(() => {
      done();
    });
  });

  it('should handle a POST request with a like correctly', done => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        type: 'like',
        userId: USER_ID_1,
        items: [ITEM_ID_1, ITEM_ID_2]
      }
    };
    const res = {
      status: code => ({
        send: async () => {
          assert.equal(code, 200);
          assert.deepEqual(await raccoonWrapper.likedBy(ITEM_ID_1), [
            USER_ID_1
          ]);
          assert.deepEqual(await raccoonWrapper.likedBy(ITEM_ID_2), [
            USER_ID_1
          ]);
          await raccoonWrapper.rate(USER_ID_1, ITEM_ID_1, 'unlike');
          await raccoonWrapper.rate(USER_ID_1, ITEM_ID_2, 'undislike');
          done();
        }
      })
    };
    rateEvent(req, res);
  });

  it('should update the recommender database correctly with like and dislike', done => {
    // Wrapping functions in a wrap method that
    async function asyncWrap() {
      try {
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_1, 'like');
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_2, 'dislike');
        assert.deepEqual(await raccoonWrapper.likedBy(ITEM_ID_1), [USER_ID_1]);
        assert.deepEqual(await raccoonWrapper.dislikedBy(ITEM_ID_2), [
          USER_ID_1
        ]);
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_1, 'unlike');
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_2, 'undislike');
      } catch (e) {
        throw e;
      }
    }

    asyncWrap()
      .then(() => done())
      .catch(e => assert.fail(e));
  });
});

// Populate the redis first 
// Before all: Grab initial data from lamchiminhmark@gmail.com user and store in 
// Run updateRecommendations and check that results are good
// After all: Wipe users and events collections
describe('updateRecommendations', () => {
  let markInitialData;

  beforeEach(async () => {
    const docSnapshot = await db.collection('users').doc(MARK_USER_ID).get();
    markInitialData = docSnapshot.data();
  });

  afterEach(done => {
    const client = redis.createClient();
    client.flushall(async () => {
      await db.collection('users').doc(MARK_USER_ID).set(markInitialData);
      done();
    });
  })

  it('should work even if there is no data in the redis', () => {
    assert.fail();
  })

  it('should update Mark\'s behaviour rec correctly', async done => {
    await raccoonWrapper.rate(USER_ID_1, MUSIC_ID, 'like');
    await raccoonWrapper.rate(USER_ID_1, 'Strings', 'like');
    await raccoonWrapper.rate(MARK_USER_ID, MUSIC_ID, 'like');
    await raccoonWrapper.rate(MARK_USER_ID, UNDERGRADUATE_RESEARCH_ID, 'like');
    assert.deepEqual(await raccoonWrapper.recommend(MARK_USER_ID), ['Bananna Pancakes']);
    // TODO(ML): Prove that the redis has been modified
    redis.createClient().keys('*', async (err, keys) => {
      console.log(keys);
      await updateRecommendations(MARK_USER_ID);
      const docSnapshot = await db.collection('users').doc(MARK_USER_ID).get();
      assert.deepEqual(docSnapshot.get('events.recommended'), ['Banana Pancake', 'Claude Debussy']);
      done();
    });
  })
})

after(() => {
  test.cleanup();
});
