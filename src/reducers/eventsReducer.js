import {
  GET_ALL_EVENTS,
  SET_SELECTED_EVENTS,
  TOGGLE_EVENT
} from '../actions/types';

const initialState = {
  allMarkers: [],
  selectedEventsArray: [{ID: 0}],
  activeEventIdx: 0
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {...state, allMarkers: [...action.payload]}
    case SET_SELECTED_EVENTS:
      return {
        ...state,
        selectedEventsArray: action.selectedEventsArray,
        activeEventIdx: 0
      };
    case TOGGLE_EVENT:
      return {
        ...state,
        activeEventIdx:
          action.direction === 'PREV'
            ? state.activeEventIdx - 1
            : state.activeEventIdx + 1
      };
    default:
      return state;
  }
};

export default eventsReducer;
