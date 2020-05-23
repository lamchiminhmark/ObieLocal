import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import eventsReducer from './eventsReducer.js';
import sidepaneReducer from './sidepaneReducer.js';
import mapReducer from './mapReducer.js';
import filterReducer from './filterReducer';
import { authReducer } from './authReducer';

export default combineReducers({
  events: eventsReducer,
  sidepane: sidepaneReducer,
  map: mapReducer,
  filter: filterReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
});
