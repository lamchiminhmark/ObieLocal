import React, { Component } from "react";
import MapContainer from './MapContainer';
import Marker from './Marker';
import NavBar from './NavBar';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}>
          {markers}
        </MapContainer>
        <NavBar />
      </div>
    );
  }
}

export default App;

