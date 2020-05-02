const test = require('firebase-functions-test')();
const assert = require('chai').assert;

const USER_ID_1 = '10';
const EVENT_ID_1 = '19';
const EVENT_ID_2 = '20';

// Importing functions
const raccoonWrapper = require('../raccoon-wrapper');
// Wrapping functions in a wrap method that
async function asyncWrap() {
  try {
    await raccoonWrapper.liked(USER_ID_1, EVENT_ID_1);
    await raccoonWrapper.disliked(USER_ID_1, EVENT_ID_2);
    assert.deepEqual(await raccoonWrapper.likedBy(EVENT_ID_1), [USER_ID_1]);
    assert.deepEqual(await raccoonWrapper.dislikedBy(EVENT_ID_2), [USER_ID_1]);
    await raccoonWrapper.unliked(USER_ID_1, EVENT_ID_1);
    await raccoonWrapper.undisliked(USER_ID_1, EVENT_ID_2);
  } catch (e) {
    console.log(e);
  }
  test.cleanup();
}

return asyncWrap();
