import React, { Component } from "react";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";
import "./App.css";
import UserButton from "./UserButton";
import Sidepane from "./Sidepane";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer zoom={18} />
        <Sidepane />
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;
