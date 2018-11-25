import React, { Component } from "react";
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import Marker from "./Marker";
import "./App.css";
import UserButton from "./UserButton";

class App extends Component {
  render() {
    const markers = [
      { lat: "41.287216", lng: "-82.23687" },
      { lat: "41.287320", lng: "-82.23690" }
    ].map(obj => <Marker lat={obj.lat} lng={obj.lng} />);

    return (
      <div className="App">
        <MapContainer zoom={18} >
          {markers}
        </MapContainer>
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;
