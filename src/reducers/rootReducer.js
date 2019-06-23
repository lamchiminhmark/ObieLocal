import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer.js";
import sidepaneReducer from "./sidepaneReducer.js";
import mapReducer from './mapReducer.js';

export default combineReducers({
  events: eventsReducer,
  sidepane: sidepaneReducer,
  map: mapReducer,
});
