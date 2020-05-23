import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCzuk_iR7dN1mal82FE47nKUJEkHg9sn9U",
  authDomain: "test-twine-12451.firebaseapp.com",
  databaseURL: "https://test-twine-12451.firebaseio.com",
  projectId: "test-twine-12451",
  storageBucket: "test-twine-12451.appspot.com",
  messagingSenderId: "84002825647",
  appId: "1:84002825647:web:43bba8f6fb4641093e3b5a"
};

firebase.initializeApp(firebaseConfig);

export default firebase;