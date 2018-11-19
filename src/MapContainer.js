import React, { Children } from "react";
import GoogleMapReact from "google-map-react";
import mapStyle from './mapStyle';
import styledMapCanvas from './styledMapCanvas.js';

export default props => {
  // console.log("zoom");
  
  return (
    <div style={styledMapCanvas}>
    <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDG4jsaUZwec9Udazw_zB974fe27FkevL8",
          language: "en"
        }}
        center={{ lat: 41.2926, lng: -82.2183 }}
        zoom={props.zoom}
        options={{styles: mapStyle}}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  );
};
