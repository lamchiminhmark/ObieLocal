import React from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle';
import styledMapCanvas from './styledMapCanvas.js';
import config from './config';

export default props => {
  return (
    <div style={styledMapCanvas}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: config.GOOGLE_MAP_API_KEY,
          language: 'en'
        }}
        center={{ lat: 41.2926, lng: -82.2183 }}
        zoom={props.zoom}
        options={{ styles: mapStyle }}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  );
};
