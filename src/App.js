import React, { Component } from 'react';
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import './App.css';
import UserButton from './UserButton';
import Sidepane from './Sidepane';
import Marker from "./Marker";

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeEventInfo: {
        ID: 0,
        title: 'NoTitle',
        date: new Date(),
        time: 'NoTime',
        location: 'No Location',
        price: 0,
        desc: 'No description',
        photo_url: 'None',
        address: 'No address',
        filters: 'None'
      }
    };
  }

  handleMarkerClick(eventInfo) {
    this.setState({ activeEventInfo: eventInfo });
  }

  render() {
    const markers = [
      { lat: "41.287216", lng: "-82.23687" },
      { lat: "41.287320", lng: "-82.23690" }
    ].map(obj => <Marker lat={obj.lat} lng={obj.lng} handleMarkerClick={this.handleMarkerClick}/>);

    return (
      <div className="App">
        <MapContainer zoom={18} >
          {markers}
        </MapContainer>
        <Sidepane eventInfo={this.state.activeEventInfo} />
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;
