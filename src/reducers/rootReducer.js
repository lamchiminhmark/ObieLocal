import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer.js";
import sidepaneReducer from "./sidepaneReducer.js";
import mapReducer from './mapReducer.js';
import filterReducer from  './filterReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { authReducer } from './authReducer';

export default combineReducers({
  events: eventsReducer,
  sidepane: sidepaneReducer,
  map: mapReducer,
  filter: filterReducer,
  auth: authReducer,
  firebase: firebaseReducer
});
