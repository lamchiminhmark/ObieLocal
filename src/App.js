import React, { Component, Children } from 'react';
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import './App.css';
import UserButton from './UserButton';
import PlusButton from './PlusButton';
import Sidepane from './Sidepane';
import Marker from './Marker';
import CreateEventContainer from './CreateEventContainer';

function removeBadEventTimes(rawEvent) {
  const now = new Date();
  const [HOUR_LIMIT, HOUR_TO_MILLISECONDS] = [4, 3600000];
  const earlyBound = new Date(
    now.getTime() - HOUR_LIMIT * HOUR_TO_MILLISECONDS
  );
  if (rawEvent.end_time) {
    return rawEvent.end_time > now.toISOString();
  } else {
    return rawEvent.start_time > earlyBound.toISOString();
  }
}

function toEventArrays(result, rawEvent) {
  // TODO: add a forEach to put the events in each array in chronological order.
  const { latitude, longitude, ...event } = rawEvent;
  const markerIdx = result.findIndex(markerObj => {
    return (
      markerObj.geo.latitude === latitude &&
      markerObj.geo.longitude === longitude
    );
  });
  if (markerIdx >= 0) {
    const markerObj = result[markerIdx];
    markerObj.events.push(event);
  } else {
    result.push({
      geo: {
        latitude,
        longitude
      },
      events: [event]
    });
  }
  return result;
}

function toMarkerArray(markerObj) {
  return (
    <Marker
      lat={markerObj.geo.latitude}
      lng={markerObj.geo.longitude}
      handleMarkerClick={this.handleMarkerClick}
      eventArray={markerObj.events}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      activeEventArray: [{
        ID: 0,
        title: "",
        date: "",
        time: "",
        location_name: "",
        price: 0,
        desc: "",
        photo_url: "",
        address: "",
        filters: ""
      }],
      sidepaneOpen: false,
      createEventContainerOpen: false
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.toggleSidepane = this.toggleSidepane.bind(this);
    this.toggleCreateEventContainer = this.toggleCreateEventContainer.bind(
      this
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  /* Fetch all markers from the database and display markers
  that are within the given time frame. Note that HOUR_LIMIT
  is the amount of hours before the current time that markers
  with no end_time will stop showing. */
  fetchData() {

    fetch('http://obielocal.cs.oberlin.edu:3001/query')
      // fetch("http://localhost:3001/query")
      .then(response => response.json())
      .then(arr => {
        const markers = arr
          .filter(removeBadEventTimes)
          .reduce(toEventArrays, [])
          .map(toMarkerArray);
        this.setState({ markers });
      })
      .catch(error => console.error('Loading markers failed! ', error));
  }

  handleMarkerClick(eventArray) {
    // If the CreateEvent panel is open, Sidepane can't be opened
    if (this.state.createEventContainerOpen) return;
    this.setState({ activeEventArray: eventArray, sidepaneOpen: true });
  }

  /* Closes or opens sidepane. If obj.close is true, just close side pane */
  toggleSidepane(obj) {
    //if (close) this.setState({sidepaneOpen: false});
    if (this.state.createEventContainerOpen) return;
    if (obj && obj.close) this.setState({ sidepaneOpen: !obj.close });
    else if (this.state.activeEventArray[0].ID !== 0)
      this.setState({ sidepaneOpen: !this.state.sidepaneOpen });
    else alert('You must select an event marker to view event information.');
  }

  /* If show is true, CreateEventContainer is opened, otherwise it is closed*/
  toggleCreateEventContainer(show) {
    this.setState({ createEventContainerOpen: show });
  }

  render() {
    return (
      <div className="App">
        <MapContainer zoom={18}>
          {Children.toArray(this.state.markers)}
        </MapContainer>
        <Sidepane
          eventArray={this.state.activeEventArray}
          active={this.state.sidepaneOpen}
          handleSidepaneClick={this.toggleSidepane}
        />
        <NavBar />
        <PlusButton
          toggleCreateEventContainer={this.toggleCreateEventContainer}
          toggleSidepane={this.toggleSidepane}
        />
        <UserButton />
        <CreateEventContainer
          active={this.state.createEventContainerOpen}
          toggleCreateEventContainer={this.toggleCreateEventContainer}
          fetchMarkers={this.fetchData}
        />
      </div>
    );
  }
}

export default App;
