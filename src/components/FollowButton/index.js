import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirestore } from 'react-redux-firebase';
import {
  following,
  followRequestSent,
  followError,
} from '../../actions/followActions';

const followOnClick = (props) => () => {
  followHandler(props);
};

const followHandler = async (props) => {
  const { firestore, userId, followeeId } = props;
  const userRef = { collection: 'users', doc: userId };
  const followeeRef = { collection: 'users', doc: followeeId };
  try {
    const followee = await firestore.get(followeeRef);
    const followeeData = followee.data();
    if (followeeData.follow && followeeData.follow.followers.includes(userId))
      throw new Error(
        `User ${userId} is already following user ${followeeId}.`
      );
    if (followeeData.follow && !followeeData.follow.requestOn) {
      await Promise.all([
        firestore.update(followeeRef, {
          'follow.followers': firestore.FieldValue.arrayUnion(userId),
        }),
        firestore.update(userRef, {
          'follow.followees': firestore.FieldValue.arrayUnion(followeeId),
        }),
      ]);
      props.following(userId, followeeId);
    } else {
      await Promise.all([
        firestore.update(followeeRef, {
          'follow.followRequests': firestore.FieldValue.arrayUnion(userId),
        }),
        firestore.update(userRef, {
          'follow.sentRequests': firestore.FieldValue.arrayUnion(followeeId),
        }),
      ]);
      props.followRequestSent(followeeId);
    }
  } catch (err) {
    props.followError(err);
  }
};

const FollowButton = (props) => {
  return <button onClick={props.followOnClick}>Follow</button>;
};

const mapDispatchToProps = {
  following,
  followRequestSent,
  followError,
};

export default compose(
  connect(undefined, mapDispatchToProps),
  withFirestore,
  withHandlers({
    followOnClick: followOnClick,
  })
)(FollowButton);
