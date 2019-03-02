import React, { Component, Children } from 'react';
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import './App.css';
import UserButton from './UserButton';
import PlusButton from './PlusButton';
import Sidepane from './Sidepane';
import Marker from './Marker';
import CreateEventContainer from './CreateEventContainer';
import constants from './constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      activeEventArray: [
        {
          ID: 0,
          title: '',
          date: '',
          time: '',
          location_name: '',
          price: 0,
          desc: '',
          photo_url: '',
          address: '',
          filters: ''
        }
      ],
      activeEventIdx: 0,
      sidepaneOpen: false,
      createEventContainerOpen: false
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleEventSwitch = this.handleEventSwitch.bind(this);
    this.toggleSidepane = this.toggleSidepane.bind(this);
    this.toggleCreateEventContainer = this.toggleCreateEventContainer.bind(
      this
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Fetch all events from the database, reformat the data, and display
   * appropriate markers that fall within the given time frame.
   */
  fetchData() {
    fetch('http://obielocal.cs.oberlin.edu:3001/query')
      // fetch("http://localhost:3001/query")
      .then(response => response.json())
      .then(arr => {
        const markers = arr
          .filter(checkEventTimes)
          .reduce(toMarkerArray, [])
          .map(toMarkerElement, this);
        this.setState({ markers });
      })
      .catch(error => console.error('Loading markers failed! ', error));
  }

  handleMarkerClick(eventArray) {
    // If the CreateEvent panel is open, Sidepane can't be opened
    if (this.state.createEventContainerOpen) return;
    this.setState({
      activeEventArray: eventArray,
      activeEventIdx: 0,
      sidepaneOpen: true
    });
  }

  handleEventSwitch(e) {
    switch (e.target.id) {
      case 'button-prev-event':
        this.setState({ activeEventIdx: this.state.activeEventIdx - 1 });
        break;
      case 'button-next-event':
        this.setState({ activeEventIdx: this.state.activeEventIdx + 1 });
        break;
      default:
    }
  }

  /* Closes or opens sidepane. If obj.close is true, just close side pane */
  toggleSidepane(obj) {
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
        <NavBar />
        <MapContainer zoom={18}>
          {Children.toArray(this.state.markers)}
        </MapContainer>
        <Sidepane
          eventArray={this.state.activeEventArray}
          active={this.state.sidepaneOpen}
          handleSidepaneClick={this.toggleSidepane}
          handleEventSwitch={this.handleEventSwitch}
          eventIdx={this.state.activeEventIdx}
        />
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

/**
 * Checks if an event object falls within an appropriate time frame relative
 * to the current time. The function first checks by end_time, but if there
 * is no end_time field, it bases the return value on the start_time.
 * @constant HOUR_LIMIT the amount of hours before the current time such that
 *  markers with no end_time will return false.
 * @param {JSON} rawEvent the event object to be checked for validity.
 */
function checkEventTimes(rawEvent) {
  const now = new Date();
  const earlyBound = new Date(
    now.getTime() - constants.HOUR_LIMIT * constants.HOUR_TO_MILLISECONDS
  );
  if (rawEvent.end_time) {
    return rawEvent.end_time > now.toISOString();
  } else {
    return rawEvent.start_time > earlyBound.toISOString();
  }
}

/**
 * Inserts an event object into a marker object that represents a given
 * location on the map. If no marker object with matching coordinates exists
 * within the result array, then a new object is added. The events array within
 * each object is sorted by start time of the event.
 * @param {Array<JSON>} result an array of marker objects.
 * @param {JSON} rawEvent the event object to be inserted within the result
 *  array.
 */
function toMarkerArray(result, rawEvent) {
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
    markerObj.events.sort((a, b) => {
      if (a.start_time > b.start_time) return 1;
      if (a.start_time < b.start_time) return -1;
      return 0;
    });
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

/**
 * Formats a marker object as a Marker element.
 * @param {JSON} markerObj the marker object to be rendered as a Marker.
 * @returns {JSX.Element} a Marker element.
 */
function toMarkerElement(markerObj) {
  return (
    <Marker
      lat={markerObj.geo.latitude}
      lng={markerObj.geo.longitude}
      handleMarkerClick={this.handleMarkerClick}
      eventArray={markerObj.events}
    />
  );
}

export default App;
