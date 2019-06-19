import React, { Component, Children } from "react";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";
import "./App.css";
import Sidepane from "./Sidepane";
import Marker from "./Marker";
import constants from "./constants";
import ReactGA from "react-ga";
import config from "./config";
import { connect } from "react-redux";
import { fetchData } from './actions/markerAction';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      activeEventArray: [
        {
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
        }
      ],
      activeEventIdx: 0,
      sidepaneOpen: false,
      createEventContainerOpen: false,
      activeTab: "Event",
      lat: 41.2926,
      lng: -82.2183,
      mapZoom: 17
    };

    this.handleEventSwitch = this.handleEventSwitch.bind(this);
    this.toggleSidepane = this.toggleSidepane.bind(this);
    this.toggleCreateEventContainer = this.toggleCreateEventContainer.bind(
      this
    );
  }

  componentDidMount() {
    initializeReactGA();
    this.props.fetchData();
  }

  // TODO: Documentation
  handleMarkerClick(eventArray) {
    // If the CreateEvent panel is open, Sidepane can't be opened
    if (this.state.createEventContainerOpen) return;
    // Update google analytics about user click
    ReactGA.event({
      category: "User",
      action: "Marker Click"
    });
    this.setState({
      activeEventArray: eventArray,
      activeEventIdx: 0,
      sidepaneOpen: true,
      activeTab: "Event"
    });
  }

  handleEventSwitch(e) {
    switch (e.target.id) {
      case "button-prev-event":
        this.setState({ activeEventIdx: this.state.activeEventIdx - 1 });
        break;
      case "button-next-event":
        this.setState({ activeEventIdx: this.state.activeEventIdx + 1 });
        break;
      default:
    }
  }

  /* Closes or opens sidepane. If obj.close is true, just close side pane */
  toggleSidepane(obj) {
    if (this.state.createEventContainerOpen) return;
    if (obj && obj.close) this.setState({ sidepaneOpen: !obj.close });
    //if (this.state.activeEventArray[0].ID !== 0)
    else this.setState({ sidepaneOpen: !this.state.sidepaneOpen });
    //else alert('You must select an event marker to view event information.');
  }

  /* If show is true, CreateEventContainer is opened, otherwise it is closed*/
  toggleCreateEventContainer(show) {
    this.setState({ createEventContainerOpen: show });
  }

  render() {
    const {markers} = this.props;
    // Convert markers to events
    // TECH_DEBT(ML): App should be passing a single state to both markers and agenda (preferably this state goes to the redux store)
    const events = markers.reduce((soFar, marker) => {
      // Add coordinates to the 1 or more events in a marker
      const eventsWithCoor = marker.props.eventArray.map(event => ({
        ...event,
        lat: marker.props.lat,
        lng: marker.props.lng
      }));
      return soFar.concat(eventsWithCoor);
    }, []);
    return (
        <div className="App">
          <NavBar handleMenuClick={this.toggleSidepane} />
          <MapContainer
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.mapZoom}
          >
            {/*TECH_DEBT(KN): Clean this shit up */}
            {Children.toArray(
              markers.filter(
                marker => marker.props.lat || marker.props.lng
              )
            )}
          </MapContainer>
          <Sidepane
            eventArray={this.state.activeEventArray}
            events={events}
            active={this.state.sidepaneOpen}
            handleSidepaneClick={this.toggleSidepane}
            handleEventSwitch={this.handleEventSwitch}
            eventIdx={this.state.activeEventIdx}
            checkEventTimes={this.checkEventTimes}
            activeTab={this.state.activeTab}
            handleAgendaClick={this.handleAgendaClick}
          />
        </div>
    );
  }
}

/**
 * Checks if an event object falls within an appropriate time frame relative
 * to the current time. The function first checks by end_time, but if there
 * is no end_time field, it bases the return value on the start_time. Only
 * events that start on the current day are shown.
 * @constant HOUR_LIMIT the amount of hours before the current time such that
 *  markers with no end_time will return false.
 * @param {JSON} rawEvent the event object to be checked for validity.
 */
function checkEventTimes(rawEvent) {
  const now = new Date();
  const earlyBound = new Date(
    now.getTime() - constants.HOUR_LIMIT * constants.HOUR_TO_MILLISECONDS
  );
  const rawEventDate = new Date(rawEvent.start_time).getDate();
  if (rawEvent.end_time) {
    return (
      rawEvent.end_time > now.toISOString() && now.getDate() === rawEventDate
    );
  } else {
    return (
      rawEvent.start_time > earlyBound.toISOString() &&
      now.getDate() === rawEventDate
    );
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

/**
 * Calling function will increase hit count on Google Analytics by 1
 */
function initializeReactGA() {
  ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);
  ReactGA.pageview("/");
}

const mapStateToProps = ({markers}) => {
  return {markers}
}

const mapDispatchToProps = dispatch => {
  // What to return? The action you want the component to have access to
  return {
    // a fetchData function that will dispatch a FETCH_DATA action when called
    fetchData: () => dispatch(fetchData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
