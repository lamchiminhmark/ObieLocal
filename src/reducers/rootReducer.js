import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer.js";
import sidepaneReducer from "./sidepaneReducer.js";
import mapReducer from './mapReducer.js';
import filterReducer from  './filterReducer';

export default combineReducers({
  events: eventsReducer,
  sidepane: sidepaneReducer,
  map: mapReducer,
  filter: filterReducer
});
