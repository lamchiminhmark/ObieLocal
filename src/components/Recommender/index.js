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

    const getRec = () => {
        if (props.users) {
            // Generate behaviour rec 
            const behaviorRec = props.user && props.user.events.recommended;

            // Generate social recommendations
            const socialRec = getSocialRec(props.followees, props.users);
            // console.log(socialRec);

            // Generate interest recommendations
            const interestRec = getInterestRec(props.user.interests, props.events);

            // TODO(ML): Benchmark the combination step alone
            // Combine the recommendations
            return combineRec(behaviorRec, socialRec, interestRec);
        }
    }
    console.log(getRec());

    return (<div>hi</div>)
}

/**
 * Returns an Object of {event: n} where each event have n interested followees
 * Note: If the followee's records cannot be found, she does not impact the recommendation 
 * @param {uid[]} followees array of uids
 * @param {User[]} users array of Users
 */
const getSocialRec = (followees, users) => {
    const toReturn = {};
    followees.forEach(followee => {
        if (!users[followee]) return;
        users[followee]
            .events
            .interested
            .map(event => event.trim())                 // Remove white spaces on the edges
            .forEach(event => toReturn[event] ? toReturn[event]++ : toReturn[event] = 1);

        users[followee]
            .events
            .going
            .map(event => event.trim())                 // Remove white spaces on the edges
            .forEach(event => toReturn[event] ? toReturn[event]++ : toReturn[event] = 1);
    });
    return toReturn;
}

/**
 * returns an array of event IDs with attributes that match are in the inputted interests
 * @param {string[]} interests 
 * @param {Object} events a hashmap of Events
 */
const getInterestRec = (interests, events) => {
    const toReturn = [];
    Object.entries(events).forEach(([id, event]) => {
        const eventTypes = event.filters.event_types || [];
        const departments = event.filters.departments || [];
        const attributes = eventTypes
            .concat(departments)
            .map(attr => attr.name);
        for (const attr of attributes) {
            if (interests.includes(attr)) {
                toReturn.push(id);
                return;
            }
        }
    });
    if (toReturn.length > 30)
        console.error(`Interest Rec is not supposed to be longer than 30 items. There's ${toReturn} recs`);
    return toReturn;
}

/**
 * Returns the combined recommendation array
 * @param {string[]} behaviorRec 
 * @param {Object} socialRec {eventId: interestedFollowees} 
 * @param {string[]} interestRec 
 */
export const combineRec = (behaviorRec = [], socialRec = {}, interestRec = []) => {
    let nonSocialRec = [...behaviorRec, ...interestRec]
    socialRec = { ...socialRec } // Creating a shallow copy
    nonSocialRec = nonSocialRec.filter((rec, i) => nonSocialRec.indexOf(rec) === i); // Remove duplicates
    const topRecs = [] // topRecs is an array of tuples [id, followeesCount] and
    // will contain recs that are in both social and non-social
    Object.entries(socialRec).forEach(([id, count]) => {
        if (nonSocialRec.includes(id)) {
            topRecs.push([id, count]);
            delete socialRec[id];
            nonSocialRec.splice(nonSocialRec.indexOf(id), 1);
        }
    });
    topRecs.sort((rec1, rec2) => rec2[1] - rec1[1]);

    const socialRecArr = Object.entries(socialRec);
    socialRecArr.sort((rec1, rec2) => rec2[1] - rec1[1]);

    return topRecs
        .concat(socialRecArr)
        .concat(nonSocialRec.map(rec => [rec, 0]));
}

const mapStateToProps = ({ firebase: { auth }, firestore: { data } }) => {
    return {
        auth,
        user: data.users && data.users[auth.uid],
        followees: data.users && data.users[auth.uid].follow.followees,
        users: data.users,
        events: data.events
    }
}

const firestoreConnectArgs = props => {
    const followeesConnection = props.followees ?
        props.followees.map(followee =>
            ({ collection: 'users', doc: followee })
        ) :
        [];
    return [
        { collection: 'users', doc: props.auth.uid },
        ...followeesConnection,
        { collection: 'events' }
    ]
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(firestoreConnectArgs)
)(Recommender);