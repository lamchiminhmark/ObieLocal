import { RECENTER_MAP } from '../actions/types';

const initState = {
  lat: 41.2926,
  lng: -82.2183,
  zoom: 17
};

const mapReducer = (state = initState, action) => {
  switch (action.type) {
    case RECENTER_MAP:
      const { zoom, lat, lng } = action;
      return {
        ...state,
        zoom,
        lat,
        lng
      };
    default:
      return state;
  }
  return state;
};

export default mapReducer;
