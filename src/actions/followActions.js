import { FOLLOW_REQUEST_SENT, FOLLOWING, FOLLOW_ERROR } from "./types";

export const following = (followeeId) => (dispatch) => {
  dispatch({
    type: FOLLOWING,
    followeeId,
  });
};

export const followRequestSent = (followeeId) => (dispatch) => {
  dispatch({
    type: FOLLOW_REQUEST_SENT,
    followeeId,
  });
};

export const followError = (error) => (dispatch) => {
  dispatch({
    type: FOLLOW_ERROR,
    error,
  });
};
