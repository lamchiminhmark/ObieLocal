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
        title: "",
        date: "",
        time: "",
        location: "",
        price: 0,
        desc: "",
        photo_url: "",
        address: "",
        filters: ""
      },
      sidepaneOpen: false
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleSidepaneClick = this.handleSidepaneClick.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  // CONTINUE(ML): Finish rendering Markers onto the map
  fetchData() {
    fetch("http://obielocal.cs.oberlin.edu:3001/query")
      .then(response => response.json())
      .then(arr => {
        // console.log(arr);
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
    this.setState({ activeEventInfo: eventInfo, sidepaneOpen: true });
  }

  handleSidepaneClick() {
    if (this.state.activeEventInfo.ID !== 0) this.setState({ sidepaneOpen: !this.state.sidepaneOpen });
    else (alert("You must select an event marker to view event information."))
  }

  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}>{Children.toArray(this.state.markers)}</MapContainer>
        <Sidepane 
          eventInfo={this.state.activeEventInfo} 
          active={this.state.sidepaneOpen} 
          handleSidepaneClick={this.handleSidepaneClick} 
        />
        <NavBar />
        <UserButton />
      </div>
    );
  }
}

export default App;
