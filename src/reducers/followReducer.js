import { FOLLOW_ERROR, FOLLOW_REQUEST_SENT, FOLLOWING } from "../actions/types";

const followReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOWING:
      console.log(`Now following user ${action.followeeId}`);
      return {};
    case FOLLOW_REQUEST_SENT:
      console.log(`Follow request sent to ${action.followeeId}`);
      return {};
    case FOLLOW_ERROR:
      console.log("Error following user: ", action.error);
      return {};
    default:
      return {};
  }
};

export default followReducer;
