const test = require('firebase-functions-test')(
  {
    projectId: 'test-twine-12451'
  },
  'test/test-twine-12451-69359364facf.json'
);
const assert = require('chai').assert;
const redis = require('redis');
const admin = require('firebase-admin');
const raccoon = require('raccoon');

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
const REMEMBERS_KENT_STATE_ID = "D164CwoPKT5nrH6bQebO"; // Strings, Music
const WORLD_MUSICIAN_ID = "32AsLZBQpaloPtbUKCPF" // Music
const RESEARCH_SYMPOSIUM = "SeGwEBzwuINtq59napzF" // Undergraduate Research
const ALL_THAT_JAZZ_ID = "t9niWLq9v2mZsRyWNO1a" // Music

// Global setup
const db = admin.firestore();

describe('raccoon-wrapper', () => {
  afterEach(done => {
    const client = redis.createClient();
    client.flushall(() => {
      done();
    });
  });
  describe('rateEvent', () => {

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

  describe('recommend', () => {
    it('should give the right recommendations', async () => {
      await raccoonWrapper.rate(USER_ID_1, ITEM_ID_1, 'like');
      await raccoonWrapper.rate(USER_ID_1, MUSIC_ID, 'like');
      await raccoonWrapper.rate(MARK_USER_ID, MUSIC_ID, 'like');
      await raccoonWrapper.rate(MARK_USER_ID, UNDERGRADUATE_RESEARCH_ID, 'like');
      const EXPECTATION = {
        [MUSIC_ID]: 2,
        [UNDERGRADUATE_RESEARCH_ID]: 2,
        [ITEM_ID_1]: 1,
      }
      assert.deepEqual(await raccoonWrapper.recommend(MARK_USER_ID), EXPECTATION);
    })
  })
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

  it('should work even if there is no data in the redis', async () => {
    await updateRecommendations(MARK_USER_ID);
    // The redis is not being flushed bfore the assert statement runs
    const docSnapshot = await db.collection('users').doc(MARK_USER_ID).get();
    assert.deepEqual(docSnapshot.get('events.recommended'), []);
  })

  it('should update Mark\'s behaviour rec correctly', async () => {
    await raccoonWrapper.rate(USER_ID_1, MUSIC_ID, 'like');
    await raccoonWrapper.rate(USER_ID_1, 'Strings', 'like');
    await raccoonWrapper.rate(MARK_USER_ID, MUSIC_ID, 'like');
    await raccoonWrapper.rate(MARK_USER_ID, UNDERGRADUATE_RESEARCH_ID, 'like');
    await updateRecommendations(MARK_USER_ID);
    const docSnapshot = await db.collection('users').doc(MARK_USER_ID).get();
    assert.deepEqual(docSnapshot.get('events.recommended'), ['banana pancake']);
  })
})

after(() => {
  test.cleanup();
});
