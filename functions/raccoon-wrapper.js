/**
 * raccoon-wrapper.js
 * Wrapper for raccoon recommender that takes a request from
 * a client and updates the raccoon accordingly
 *
 * Minh Lam
 * 4/25/2020
 */

const raccoon = require('raccoon');

/**
 * Update the raccoon redis with a like
 * @param {number} userId the ID of the user who liked
 * @param {number} itemId the ID of the item that was liked
 */
module.exports.liked = async function(userId, itemId) {
  await raccoon.liked(userId, itemId);
  return;
};

/**
 * Update the raccoon redis with a like
 * @param {number} userId the ID of the user who disliked
 * @param {number} itemId the ID of the item that was disliked
 */
module.exports.disliked = async function(userId, itemId) {
  await raccoon.disliked(userId, itemId);
  return;
};
