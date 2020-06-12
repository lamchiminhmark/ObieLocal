import {
  FOLLOW_REQUEST_SENT,
  FOLLOW_REQUEST_REJECTED,
  FOLLOWING,
  FOLLOW_ERROR,
} from './types';

export const following = (followerId, followeeId) => {
  return {
    type: FOLLOWING,
    payload: {
      followerId,
      followeeId,
    },
  };
};

export const followRequestSent = (followeeId) => {
  return {
    type: FOLLOW_REQUEST_SENT,
    followeeId,
  };
};

export const followRequestRejected = (followerId) => {
  return {
    type: FOLLOW_REQUEST_REJECTED,
    followerId,
  };
};

export const followError = (error) => {
  return {
    type: FOLLOW_ERROR,
    error,
  };
};
