import { combineReducers } from "redux";
import markersReducer from "./markersReducer.js";
import sidepaneReducer from "./sidepaneReducer.js";
import mapReducer from './mapReducer.js';

export default combineReducers({
  markers: markersReducer,
  sidepane: sidepaneReducer,
  map: mapReducer,
});
