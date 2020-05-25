import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import { createFirestoreInstance } from 'redux-firestore';
import './styles/index.css';
import App from './App';
import fbConfig from './shared/config/fbConfig';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(fbConfig);
firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
  );
//store.firebaseAuthIsReady.then(() => {
//  ReactDOM.render(
//    <Provider store={store}>
//      <App />
//    </Provider>,
//    document.getElementById('root')
//  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
