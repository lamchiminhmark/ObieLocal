import 'firebase/firestore';

export const signIn = credentials => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      dispatch({ type: 'SIGN_IN_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SIGN_IN_ERROR', err });
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signOut();
      dispatch({ type: 'SIGN_OUT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SIGN_OUT_ERROR' });
    }
  };
};

export const signUp = newUser => {
  const { email, password, firstName, lastName } = newUser;
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(resp);
      await firestore
        .collection('users')
        .doc(resp.user.uid)
        .set({
          firstName,
          lastName,
          initials: firstName[0] + lastName[0]
        });
      dispatch({ type: 'SIGN_UP_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SIGN_UP_ERROR', err: err.message });
    }
  };
};
