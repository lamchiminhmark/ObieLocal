import { FOLLOW_REQUEST_SENT, FOLLOWING, FOLLOW_ERROR } from './types';

export const following = (followeeId) => {
  return {
    type: FOLLOWING,
    followeeId,
  };
};

export const followRequestSent = (followeeId) => {
  return {
    type: FOLLOW_REQUEST_SENT,
    followeeId,
  };
};

export const followError = (error) => {
  return {
    type: FOLLOW_ERROR,
    error,
  };
};
