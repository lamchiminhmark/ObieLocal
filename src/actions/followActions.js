import { FOLLOW_REQUEST_SENT, FOLLOWING, FOLLOW_ERROR } from "./types";

export const onFollowButtonClick = ({ userId, followeeId, firestore }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    //async call to firestore
    //const firestore = getFirestore();
    const userRef = firestore.collection("users").doc(userId);
    const followeeRef = firestore.collection("users").doc(followeeId);

    try {
      const followeeDoc = await followeeRef.get();
      const followeeData = followeeDoc.data();

      if (followeeData.follow.requestOn) {
        // Write to followee's followRequests
        await followeeRef.update({
          "follow.followRequests": [
            ...followeeData.follow.followRequests,
            userId,
          ],
        });
        dispatch({
          type: FOLLOW_REQUEST_SENT,
          payload: followeeId,
        });
      } else {
        const userDoc = await userRef.get();
        const userData = userDoc.data();

        await Promise.all([
          followeeRef.update({
            "follow.followers": [...followeeData.follow.followers, userId],
          }),
          userRef.update({
            "follow.followees": [...userData.follow.followees, followeeId],
          }),
        ]);
        dispatch({
          type: FOLLOWING,
          payload: followeeId,
        });
      }
    } catch (err) {
      dispatch({
        type: FOLLOW_ERROR,
        payload: err,
      });
    }
  };
};
