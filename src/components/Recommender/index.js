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
    console.log(props.behaviorRec)
    return (<div>{props.behaviorRec}</div>)
}

const mapStateToProps = ({ firestore: { data } }) => {
    const uid = '1FX9PWN8H4TreVGKEwoxxrXLWCc2';
    return { behaviorRec: data.users && data.users[uid] }
}

export default compose(
    firestoreConnect(() => [{ collection: 'users', doc: '1FX9PWN8H4TreVGKEwoxxrXLWCc2' }]),
    connect(mapStateToProps)
)(Recommender);