import 'firebase/firestore';

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
