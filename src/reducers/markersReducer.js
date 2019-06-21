import { FETCH_DATA, SET_SELECTED_EVENTS } from '../actions/types';

const initialState = {
  allMarkers: [],
  selectedEventArray: [{}],
  activeEventIdx: 0,
  // TODO(ML): These sidepane states should not be here
  sidepaneOpen: false,
  activeTab: 'Event'
};

const markers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, allMarkers: [...action.payload] };
    case SET_SELECTED_EVENTS:
      return {
        ...state,
        selectedEventArray: action.selectedEventArray,
        activeEventIdx: 0,
        sidepaneOpen: true,
        activeTab: 'Event'
      };
    default:
      return state;
  }
};

export default markers;
