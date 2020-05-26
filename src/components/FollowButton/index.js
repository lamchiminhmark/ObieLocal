import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withHandlers } from "recompose";
import { withFirestore } from "react-redux-firebase";

const followOnClick = (props) => () => {
  followHandler(props);
};

const followHandler = async (props) => {
  const { firestore, userId, followeeId } = props;
  const userRef = { collection: "users", doc: userId };
  const followeeRef = { collection: "users", doc: followeeId };
  try {
    const user = await firestore.get(userRef);
    const followee = await firestore.get(followeeRef);
    const userData = user.data();
    const followeeData = followee.data();
    if (!followeeData.follow.requestOn) {
      await Promise.all([
        firestore.update(followeeRef, {
          "follow.followers": [...followeeData.follow.followers, userId],
        }),
        firestore.update(userRef, {
          "follow.followees": [...userData.follow.followees, followeeId],
        }),
      ]);
      console.log("Dispatch successful write");
    }
  } catch (err) {
    console.log("Dispatch error: ", err);
  }
};

const FollowButton = (props) => {
  return <button onClick={props.followOnClick}>Follow</button>;
};

const mapStateToProps = (state) => ({
  users: state.firestore.ordered.users,
});

export default compose(
  withFirestore,
  withHandlers({
    followOnClick: followOnClick,
  }),
  connect(mapStateToProps)
)(FollowButton);
