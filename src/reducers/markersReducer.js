import {
  GET_ALL_MARKERS,
  SET_SELECTED_EVENTS,
  TOGGLE_EVENT
} from '../actions/types';

const initialState = {
  arr: [],
  selectedEventsArray: [{ID: 0}],
  activeEventIdx: 0
};

const markersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MARKERS:
      return {...state, arr: [...action.payload]}
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

export default markersReducer;
