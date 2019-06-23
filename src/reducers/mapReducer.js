import { RECENTER_MAP } from '../actions/types';

const initialState = { lat: 41.2926, lng: -82.2183, mapZoom: 17 };

const mapReducer = (state = initialState, action) => {
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
};

export default mapReducer;
