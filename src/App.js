/* Container */

import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import NavBar from './components/NavBar';
import './styles/App.css';
import Sidepane from './components/Sidepane';
import ReactGA from 'react-ga';
import config from './shared/config';
import { connect } from 'react-redux';
import { fetchData } from './actions/eventActions';
import FilterByDayButton from  './components/FilterEvents/filterDayButton'
import FollowButton from './components/FollowButton';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createEventContainerOpen: false
    };

    this.toggleCreateEventContainer = this.toggleCreateEventContainer.bind(
      this
    );
  }

  componentDidMount() {
    initializeReactGA();
    //this.props.fetchData();
  }

  /* If show is true, CreateEventContainer is opened, otherwise it is closed*/
  toggleCreateEventContainer(show) {
    this.setState({ createEventContainerOpen: show });
  }

  render() {
    initializeReactGA();
    return (
      <div className="App">
        <FollowButton userId = '1FX9PWN8H4TreVGKEwoxxrXLWCc2' followeeId = '0IUvyqgSjeEdSZFK2tuS'/>
        
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

const mapStateToProps = undefined;

const mapDispatchToProps = dispatch => {
  // What to return? The action you want the component to have access to
  return {
    // a fetchData function that will dispatch a FETCH_DATA action when called
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
