import React, { Component, Children } from 'react';
import MapContainer from './MapContainer';
import NavBar from './NavBar';
import './App.css';
import UserButton from './UserButton';
import PlusButton from './PlusButton';
import Sidepane from './Sidepane';
import Marker from './Marker';
import CreateEventContainer from './CreateEventContainer';

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
        location_name: "",
        price: 0,
        desc: "",
        photo_url: "",
        address: "",
        filters: ""
      },
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

  fetchData() {
    // fetch("http://obielocal.cs.oberlin.edu:3001/query")
    fetch("http://localhost:3001/query")  
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
      .catch(error => console.log('parsing failed', error));
  }

  handleMarkerClick(eventInfo) {
    // If the CreateEvent panel is open, Sidepane can't be opened
    if (this.state.createEventContainerOpen) return;
    this.setState({ activeEventInfo: eventInfo, sidepaneOpen: true });
  }

  /* Closes or opens sidepane. If obj.close is true, just close side pane */
  toggleSidepane(obj) {
    //if (close) this.setState({sidepaneOpen: false});
    if (this.state.createEventContainerOpen) return;
    if (obj && obj.close) this.setState({ sidepaneOpen: !obj.close });
    else if (this.state.activeEventInfo.ID !== 0)
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
          eventInfo={this.state.activeEventInfo}
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
