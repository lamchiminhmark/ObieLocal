import { FOLLOW_ERROR, FOLLOW_REQUEST_SENT, FOLLOWING, FOLLOW_REQUEST_REJECTED } from "../actions/types";

const followReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOWING:
      console.log(`${action.payload.followerId} is now following user ${action.payload.followeeId}`);
      return {};
    case FOLLOW_REQUEST_SENT:
      console.log(`Follow request sent to ${action.followeeId}`);
      return {};
    case FOLLOW_REQUEST_REJECTED:
      console.log(`Follow request rejected from ${action.requesterId}`);
      return {};
    case FOLLOW_ERROR:
      console.error("Error following user: ", action.error);
      return {};
    default:
      return {};
  }
};

export default followReducer;
