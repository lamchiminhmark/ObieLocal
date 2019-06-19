import { FETCH_DATA } from "../actions/types";

const markers = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return [...action.payload];
    default:
      return state;
  }
};

export default markers;
