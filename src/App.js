import React, { Component } from "react";
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}>
        </MapContainer>
        <NavBar />
      </div>
    );
  }
}

export default App;

