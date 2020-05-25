import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const FollowButton = props => {
  function followHandler() {
    console.log(props.userId);
    const {firestore} = props
    const userId = 10;
    const followeeId = 20;

    try {
      const followeeRef = { collection: "users", doc: followeeId };
      const userRef = { collection: "users", doc: userId };
      const followeeData = firestore.get(followeeRef);
      const userData = firestore.get(userRef);
      if (!followeeData.follow.requestOn) {
        firestore.update(followeeRef, {
          "follow.followers": [...followeeData.follow.followers, userId],
        });
        firestore.update(userRef, {
          "follow.followees": [...userData.follow.followees, followeeId],
        });
      }
    } catch (err) {
      throw new Error("Error follow user:", err);
    }
  }

  return <button onClick={followHandler}>Follow</button>;
};

const mapStateToProps = ({ firebase: { auth }, firestore: { data } }) => ({
  userId: data.users
});

export default compose(
  firestoreConnect(() => [{ collection: "users" }]),
  connect(mapStateToProps)
)(FollowButton);
