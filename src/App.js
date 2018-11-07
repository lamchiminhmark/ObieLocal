import React, { Component } from "react";
import MapContainer from './MapContainer';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}/>
      </div>
    );
  }
}

export default App;

