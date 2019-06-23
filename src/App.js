import React, { Component, Children } from 'react';
import MapContainer from './components/MapContainer';
import NavBar from './components/NavBar';
import './styles/App.css';
import Sidepane from './components/Sidepane';
import ReactGA from 'react-ga';
import config from './shared/config';
import { connect } from 'react-redux';
import { fetchData } from './actions/eventActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createEventContainerOpen: false,
    };

    this.handleEventSwitch = this.handleEventSwitch.bind(this);
    this.toggleCreateEventContainer = this.toggleCreateEventContainer.bind(
      this
    );
  }

  componentDidMount() {
    initializeReactGA();
    this.props.fetchData();
  }

  handleEventSwitch(e) {
    switch (e.target.id) {
      case 'button-prev-event':
        this.setState({ activeEventIdx: this.props.activeEventIdx - 1 });
        break;
      case 'button-next-event':
        this.setState({ activeEventIdx: this.props.activeEventIdx + 1 });
        break;
      default:
    }
  }

  /* If show is true, CreateEventContainer is opened, otherwise it is closed*/
  toggleCreateEventContainer(show) {
    this.setState({ createEventContainerOpen: show });
  }

  render() {
    const { markers } = this.props;
    initializeReactGA();
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
        <NavBar handleMenuClick={this.props.toggleSidepane} />
        <MapContainer
          lat={this.props.lat}
          lng={this.props.lng}
          zoom={this.props.zoom}
        >
          {/*TECH_DEBT(KN): Clean this shit up */}
          {Children.toArray(
            markers.filter(marker => marker.props.lat || marker.props.lng)
          )}
        </MapContainer>
        <Sidepane
          eventArray={this.props.selectedEventArray}
          events={events}
          handleEventSwitch={this.handleEventSwitch}
          eventIdx={this.props.activeEventIdx}
        />
      </div>
    );
  }
}

/**
 * Calling function will increase hit count on Google Analytics by 1
 */
function initializeReactGA() {
  ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);
  ReactGA.pageview('/');
}

const mapStateToProps = ({ events, map }) => {
  const {zoom, lat, lng} = map;
  return {
    ...events,
    markers: events.allMarkers,
    allMarkers: undefined,
    zoom, 
    lat,
    lng,
  };
};

const mapDispatchToProps = dispatch => {
  // What to return? The action you want the component to have access to
  return {
    // a fetchData function that will dispatch a FETCH_DATA action when called
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
