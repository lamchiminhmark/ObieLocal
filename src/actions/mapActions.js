import { RECENTER_MAP } from './types';

const SECRET_SAUCE_CONSTANT = 0.0001;

export const recenterMap = ({ zoom, lat, lng }) => dispatch => {
  dispatch({
    type: RECENTER_MAP,
    zoom: zoom || 17.5 + Math.random() * 0.01,
    lat: (lat || 41.2926) + (1 + Math.random()) * SECRET_SAUCE_CONSTANT,
    lng: (lng || -82.2183) - (1 + Math.random()) * SECRET_SAUCE_CONSTANT
  });
};
