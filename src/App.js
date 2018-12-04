import React, { Component } from "react";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";
import "./App.css";
import UserButton from "./UserButton";
import Sidepane from "./Sidepane";
import Marker from "./Marker";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEventInfo: {
        ID: 0,
        title: "NoTitle",
        date: "NoDate",
        time: "NoTime",
        location: "No Location",
        price: 0,
        desc: "No description",
        photo_url: "None",
        address: "No address",
        filters: "None"
      }
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  handleMarkerClick(eventInfo) {
    this.setState({ activeEventInfo: eventInfo });
  }

  render() {
    const markers = [
      { lat: "41.287216", lng: "-82.23687", date: "Dec 2", time: "10", desc: "Some desc", title: "A" },
      { lat: "41.287320", lng: "-82.23690", date: "Dec 10", time: "9", desc: "Somestuff desc", title: "B" },
    ].map(obj => (
      <Marker
        lat={obj.lat}
        lng={obj.lng}
        handleMarkerClick={this.handleMarkerClick}
        eventInfo={obj}
      />
    ));

    return (
      <div className="App">
        <MapContainer zoom={18}>{markers}</MapContainer>
        <Sidepane eventInfo={this.state.activeEventInfo} />
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;
