import { RECENTER_MAP } from './types.js';

const SECRET_SAUCE_CONSTANT = 0.0001;

export const recenterMap = args => dispatch => {
  dispatch({
    type: RECENTER_MAP,
    zoom: args.zoom || 17.5 + Math.random() * 0.01,
    lat: (args.lat || 41.2926) + (1 + Math.random()) * SECRET_SAUCE_CONSTANT,
    lng: (args.lng || -82.2183) - (1 + Math.random()) * SECRET_SAUCE_CONSTANT
  });
};
