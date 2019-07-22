import {
  TOGGLE_SIDE_PANE,
  SET_SELECTED_EVENTS,
  CHANGE_TAB
} from "../actions/types";

const initialState = {
  createEventContainerOpen: false,
  sidepaneOpen: false,
  activeTab: "Event"
};

const sidepaneReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_EVENTS:
      return {
        ...state,
        sidepaneOpen: true,
        activeTab: "Event"
      };
    case TOGGLE_SIDE_PANE:
      const obj = action.payload;
      if (state.createEventContainerOpen) return { ...state };
      if (obj && obj.close) return { ...state, sidepaneOpen: !obj.close };
      else return { ...state, sidepaneOpen: !state.sidepaneOpen };
    case CHANGE_TAB:
      if (action.payload.tab !== state.activeTab)
        return {
          ...state,
          activeTab: action.payload.tab
        };
      else return { ...state };
    default:
      return state;
  }
};

export default sidepaneReducer;
