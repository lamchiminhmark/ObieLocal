import { combineReducers } from "redux";
import markersReducer from "./markersReducer.js";
import sidepaneReducer from "./sidepaneReducer.js";

export default combineReducers({
  markers: markersReducer,
  sidepane: sidepaneReducer,
});
