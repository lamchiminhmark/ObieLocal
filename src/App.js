import React, { Component } from "react";
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import "./App.css";
import UserButton from "./UserButton";

class App extends Component {

  componentWillMount() {
    fetch('localhost:3001').then(res => console.log(res));
  }

  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}>
        </MapContainer>
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;

