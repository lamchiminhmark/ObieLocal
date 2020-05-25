import { GET_ALL_MARKERS, SET_SELECTED_EVENTS, TOGGLE_EVENT } from './types';

export const getAllEvents = events => {
  const markers = events.reduce(toMarkerArray, []);
  return {
    type: GET_ALL_MARKERS,
    payload: markers
  }
}

export const setSelectedEvents = selectedEventsArray => {
  return {
    type: SET_SELECTED_EVENTS,
    selectedEventsArray
  };
};

export const toggleEvent = direction => dispatch => {
  return dispatch({
    type: TOGGLE_EVENT,
    direction
  });
};

export function toMarkerArray(result, rawEvent) {
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
