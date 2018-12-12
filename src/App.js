import React, { Component, Children } from "react";
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
      markers: [],
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

    this.fetchData = this.fetchData.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    // this.initializeMarker = this.initializeMarker.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  // CONTINUE(ML): Finish rendering Markers onto the map
  fetchData() {
    fetch("http://localhost:3001/query")
      .then(response => response.json())
      .then(arr => {
        const newArr = arr.map(obj => (
          <Marker
            lat={obj.latitude}
            lng={obj.longitude}
            handleMarkerClick={this.handleMarkerClick}
            eventInfo={obj}
          />
        ));
        this.setState({ markers: newArr });
      })
      .catch(error => console.log("parsing failed", error));
  }

  handleMarkerClick(eventInfo) {
    this.setState({ activeEventInfo: eventInfo });
  }

  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}>{Children.toArray(this.state.markers)}</MapContainer>
        <Sidepane eventInfo={this.state.activeEventInfo} />
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;
