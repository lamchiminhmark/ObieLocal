import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyCgiLhxEWJhzoT6fw60TXNRF7003wUfHzo",
    authDomain: "obielocal-1541269219020.firebaseapp.com",
    databaseURL: "https://obielocal-1541269219020.firebaseio.com",
    projectId: "obielocal-1541269219020",
    storageBucket: "obielocal-1541269219020.appspot.com",
    messagingSenderId: "88223254036"
  };
firebase.initializeApp(config);

export default firebase