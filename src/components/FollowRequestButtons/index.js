import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirestore } from 'react-redux-firebase';
import {
  following,
  followRequestRejected,
  followError,
} from '../../actions/followActions';

const acceptFollowReqOnClick = (props) => {
  frHandler(props, true);
};

const deleteFollowReqOnClick = (props) => {
  frHandler(props, false);
};

const frHandler = async (props, isAccepted = false) => {
  const { firestore, userId, requesterId } = props;
  const userRef = { collection: 'users', doc: userId };
  const requesterRef = { collection: 'users', doc: requesterId };

  try {
    if (isAccepted) {
      await Promise.all([
        firestore.update(userRef, {
          'follow.followers': firestore.FieldValue.arrayUnion(requesterId),
          'follow.followRequests': firestore.FieldValue.arrayRemove(
            requesterId
          ),
        }),
        firestore.update(requesterRef, {
          'follow.followees': firestore.FieldValue.arrayUnion(userId),
          'follow.sentRequests': firestore.FieldValue.arrayRemove(userId),
        }),
      ]);
      props.following(requesterId, userId);
    } else {
      await Promise.all([
        firestore.update(userRef, {
          'follow.followRequests': firestore.FieldValue.arrayRemove(
            requesterId
          ),
        }),
        firestore.update(requesterRef, {
          'follow.sentRequests': firestore.FieldValue.arrayRemove(userId),
        }),
      ]);
      props.followRequestRejected(userId);
    }
  } catch (err) {
    props.followError(err);
  }
};

const FollowRequestButtons = (props) => {
  return (
    <div>
      <button onClick={props.deleteFollowReqOnClick}>Delete FR</button>
      <button onClick={props.acceptFollowReqOnClick}>Accept FR</button>
    </div>
  );
};

const mapDispatchToProps = { followRequestRejected, following, followError };

// TODO(CP): Get userId from state?
export default compose(
  connect(undefined, mapDispatchToProps),
  withFirestore,
  withHandlers({
    acceptFollowReqOnClick: acceptFollowReqOnClick,
    deleteFollowReqOnClick: deleteFollowReqOnClick,
  })
)(FollowRequestButtons);
