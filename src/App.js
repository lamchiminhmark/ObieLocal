import React, { Component } from 'react';
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import './App.css';
import UserButton from './UserButton';
import Sidepane from './Sidepane';

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
    return (
      <div className="App">
        <MapContainer zoom={18} />
        <Sidepane eventInfo={this.state.activeEventInfo} />
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;
