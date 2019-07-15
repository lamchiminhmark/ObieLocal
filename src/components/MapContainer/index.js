import React, { Children } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle';
import styledMapCanvas from './styledMapCanvas.js';
import config from '../../shared/config';
import Marker from '../Marker'

const toMarkerElement = markerObj => {
  return (
    <Marker
      lat={markerObj.geo.latitude}
      lng={markerObj.geo.longitude}
      eventArray={markerObj.events}
    />
  );
}

const MapContainer = props => {
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
        {/*TECH_DEBT(KN): Clean this shit up */}
        {Children.toArray(
          props.markers.map(obj => toMarkerElement(obj)).filter(marker => marker.props.lat || marker.props.lng)
        )}
      </GoogleMapReact>
    </div>
  );
};

const mapStateToProps = ({ events, map }) => {
  const { lat, lng, zoom } = map;
  const { allMarkers: markers } = events;
  return { lat, lng, zoom, markers };
};

export default connect(mapStateToProps)(MapContainer);
