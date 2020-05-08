const test = require('firebase-functions-test')(
  {
    projectId: 'test-twine-12451'
  },
  './test-twine-12451-69359364facf.json'
);
const assert = require('chai').assert;
// Importing functions
const raccoonWrapper = require('../raccoon-wrapper');

const USER_ID_1 = '10';
const EVENT_ID_1 = '19';
const EVENT_ID_2 = '20';

describe('rateEvent', () => {
  it('should update the recommender database correctly with like and dislike', done => {
    // Wrapping functions in a wrap method that
    async function asyncWrap() {
      try {
        await raccoonWrapper.rate(USER_ID_1, EVENT_ID_1, 'like');
        await raccoonWrapper.rate(USER_ID_1, EVENT_ID_2, 'dislike');
        assert.deepEqual(await raccoonWrapper.likedBy(EVENT_ID_1), [USER_ID_1]);
        assert.deepEqual(await raccoonWrapper.dislikedBy(EVENT_ID_2), [
          USER_ID_1
        ]);
        await raccoonWrapper.rate(USER_ID_1, EVENT_ID_1, 'unlike');
        await raccoonWrapper.rate(USER_ID_1, EVENT_ID_2, 'undislike');
      } catch (e) {
        console.log(e);
      }
      test.cleanup();
    }

    asyncWrap()
      .then(() => done())
      .catch(e => assert.fail(e));
  });
});
