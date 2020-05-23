/**
 * Recommender/index.js
 * Container that generates event recommendation for current user
 * 
 * Minh Lam
 * 5/22/2020
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// TODO(ML): This might be a use case for render nested child
const Recommender = props => {
    // console.log(props.behaviorRec)
    return (<div>hi</div>)
}

const mapStateToProps = ({ firebase: { auth }, firestore: { data } }) => {
    return { auth, behaviorRec: data.users && data.users[auth.uid] }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        // console.log(props.auth.uid);
        return [{ collection: 'users', doc: props.auth.uid }]
    })
)(Recommender);