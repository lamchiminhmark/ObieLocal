import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle';
import styledMapCanvas from './styledMapCanvas.js';
import config from '../../shared/config';

const MapContainer =  props => {
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

const mapStateToProps = ({map}) => {
  return {
    lat: map.lat,
    lng: map.lng,
    zoom: map.zoom
  }
}

export default connect(mapStateToProps)(MapContainer);