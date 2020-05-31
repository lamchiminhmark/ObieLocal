import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import markersReducer from './markersReducer.js';
import sidepaneReducer from './sidepaneReducer.js';
import mapReducer from './mapReducer.js';
import filterReducer from './filterReducer';

export default combineReducers({
  markers: markersReducer,
  sidepane: sidepaneReducer,
  map: mapReducer,
  filter: filterReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
