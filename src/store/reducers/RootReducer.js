import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer
});
