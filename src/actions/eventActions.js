import React from 'react';
import Marker from '../components/Marker';
import { FETCH_DATA, SET_SELECTED_EVENTS, TOGGLE_EVENT } from './types';

export const fetchData = () => dispatch => {
  fetch('https://obielocal-1541269219020.appspot.com/query')
    // fetch("http://localhost:3001/query")
    .then(response => response.json())
    .then(arr => {
      const markers = arr
        //.filter(checkEventTimes)
        .reduce(toMarkerArray, [])
        .map(toMarkerElement, this);
      dispatch({
        type: FETCH_DATA,
        payload: markers
      });
    })
    .catch(error => console.error('Loading markers failed! ', error));
};

export const setSelectedEvents = selectedEventsArray => dispatch => {
  dispatch({
    type: SET_SELECTED_EVENTS,
    selectedEventsArray,
  });
};

export const toggleEvent = direction => dispatch => {
  dispatch({
    type: TOGGLE_EVENT,
    direction,
  });
};

/**
 * Formats a marker object as a Marker element.
 * @param {JSON} markerObj the marker object to be rendered as a Marker.
 * @returns {JSX.Element} a Marker element.
 */
function toMarkerElement(markerObj) {
  return (
    <Marker
      lat={markerObj.geo.latitude}
      lng={markerObj.geo.longitude}
      eventArray={markerObj.events}
    />
  );
}

function toMarkerArray(result, rawEvent) {
  const { latitude, longitude, ...event } = rawEvent;
  const markerIdx = result.findIndex(markerObj => {
    return (
      markerObj.geo.latitude === latitude &&
      markerObj.geo.longitude === longitude
    );
  });
  if (markerIdx >= 0) {
    const markerObj = result[markerIdx];
    markerObj.events.push(event);
    markerObj.events.sort((a, b) => {
      if (a.start_time > b.start_time) return 1;
      if (a.start_time < b.start_time) return -1;
      return 0;
    });
  } else {
    result.push({
      geo: {
        latitude,
        longitude
      },
      events: [event]
    });
  }
  return result;
}
