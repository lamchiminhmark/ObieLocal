import React from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle';
import styledMapCanvas from './styledMapCanvas.js';
import config from '../../shared/config';

export default props => {
  return (
    <div style={styledMapCanvas}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: config.GOOGLE_MAP_API_KEY,
          language: 'en'
        }}
        center={{ lat: props.lat, lng: props.lng }}
        zoom={props.zoom}
        options={{ styles: mapStyle, fullscreenControl: false }}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  );
};
