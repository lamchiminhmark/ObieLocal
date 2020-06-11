import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import markersReducer from './markersReducer.js';
import sidepaneReducer from './sidepaneReducer.js';
import mapReducer from './mapReducer.js';
import filterReducer from './filterReducer';
import recommenderReducer from './recommenderReducer';
import followReducer from './followReducer';

export default combineReducers({
  markers: markersReducer,
  sidepane: sidepaneReducer,
  map: mapReducer,
  filter: filterReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  recommender: recommenderReducer,
  follow: followReducer,
});
