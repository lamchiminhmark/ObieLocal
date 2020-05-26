import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withHandlers } from "recompose";
import { withFirestore } from "react-redux-firebase";

const followHandler = (props) => () => {
  const { firestore, userId, followeeId } = props;
  const userRef = { collection: "users", doc: userId };
  const followeeRef = { collection: "users", doc: followeeId };
  firestore
    .get(userRef)
    .then((user) =>
      firestore.get(followeeRef).then((followee) => {
        const userData = user.data();
        const followeeData = followee.data();
        if (!followeeData.follow.requestOn) {
          return Promise.all([
            firestore.update(followeeRef, {
              "follow.followers": [...followeeData.follow.followers, userId],
            }),
            firestore.update(userRef, {
              "follow.followees": [...userData.follow.followees, followeeId],
            }),
          ]).then(console.log("Follow written successfully"));
        }
      })
    )
    .catch((err) => console.log("Error send follow", err));
};

const FollowButton = (props) => {
  return <button onClick={props.followHandler}>Follow</button>;
};

const mapStateToProps = (state) => ({
    users: state.firestore.ordered.users,
});

export default compose(
  withFirestore,
  withHandlers({
    followHandler: followHandler,
  }),
  connect(mapStateToProps)
)(FollowButton);
