import React, { Component } from 'react';
import ReactTags from 'react-tag-autocomplete';
import styled from 'styled-components';
import PlacesAutocomplete from './PlacesAutocomplete.tsx';

/* Coordinates of the 2 points delimiting the box used for biasing Google Places search. 
NE: Kendal 
SW: The Arboretum */
const NE = { lat: 41.3049, lng: -82.2094 };
const SW = { lat: 41.2799, lng: -82.2302 };

const google = window.google;

const StyledPane = styled.form`
  margin: 0px;
  padding: 0px;
  top: 60px;
  width: 80%;
  min-width: 90vw;
  height: 80vh;
  background-color: rgba(255, 0, 0, 0.6);
  border: 3px solid white;
  border-right: 12px solid rgb(75, 75, 75);
  border-radius: 0px;
  border-style: inset;
  transition: all 1s;

  h1 {
    text-decoration: solid black underline;
    padding: 20px 0px;
    background-color: rgba(255, 184, 29, 0.7);
  }

  p {
    overflow: clip;
  }
  em {
    font-weight: bold;
  }

  #x {
    position: relative;
    float: right;
    color: #dc143c;
    width: 6.5%;
    height: 10%;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  label {
    display: block;
    margin: auto;
    text-align: left;
  }

  input,
  textarea {
    width: 100%;
  }

  td {
    text-align: right;
  }

  table {
    margin: auto;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 30px;
    box-shadow: 0px 0px 50px 40px rgba(255, 255, 255, 0.2);
    border-radius: 25px;
  }

  #submit {
    margin: 20px 0px;
    padding: 10px;
    padding: 6px 73px;
    position: relative;
    width: auto;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.9);
    border-radius: 40px;
    cursor: pointer;
  }

  #submit:hover {
    background-color: rgba(40, 40, 40, 0.5);
  }

  #warning-text {
    text-align: center;
    color: whitesmoke;
  }
`;

export default class CreateEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      location: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeWarningText = this.changeWarningText.bind(this);
  }

  componentDidMount() {
    // Sets up the autocomplete functionality using Google Places API
    const input = document.getElementById('input-location_name');
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(SW.lat, SW.lng),
      new google.maps.LatLng(NE.lat, NE.lng)
    );
    const options = {
      bounds: defaultBounds,
      types: ['establishment', 'geocode']
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    this.autocomplete.setFields([
      'formatted_address',
      'name',
      'place_id',
      'types'
    ]);

    // TODO(ML): Get Places suggestions to recognize places through address
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      console.log(this.autocomplete.getPlace());
      const fullAddress = this.autocomplete.getPlace().formatted_address;
      // Checks if the first word in the address is the location name. If yes, remove it. If no, then it must be the address number, hence use the whole fullAddress
      const address = isNaN(fullAddress[0])
        ? fullAddress
            .substring(fullAddress.indexOf(',') + 1, fullAddress.length)
            .trim()
        : fullAddress;
      const placeName = this.autocomplete.getPlace().name;
      // const address = fullAddress.substring(fullAddress.indexOf(',')+1, fullAddress.length).trim();

      this.setState(state => ({
        form: { ...state.form, location_name: placeName, address: fullAddress }
      }));
    });
  }

  // CONTINUE(ML): Location is not updating like expected.
  handleChange(field) {
    return e => {
      const temp = {};
      switch (field) {
        case 'select_location':
          this.selectLocation(e);
          break;

        case 'location_name':
        case 'address':
          this.changePlace(e);
        // falls through
        default:
          temp[field] = e.target.value;
          // TODO(ML): Configure Prettier to have obj on separate lines
          this.setState(state => ({ form: { ...state.form, ...temp } }));
      }
    };
  }

  /**
   * Suggests autocompletes for user inputted location names
   */
  // async locationAutocomplete(e) {
  //   return;
  //   const currentLocationString = e.target.value;
  //   // CONTINUE(ML): change location and radius and try console logging the fetch responses.
  //   const res = await fetch(
  //     `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${currentLocationString}&types=establishment&location=${CENTER_COORDINATES}&radius=${RADIUS}&key=${
  //       config.GOOGLE_MAP_API_KEY
  //     }`
  //   );

  //   if (res.status === 'OK') {
  //     console.log(res.predictions);
  //   } else {
  //     console.error('Google Places API responded with an error');
  //   }
  // }

  selectLocation(e) {
    const index = e.target.selectedIndex;
    let location_name;
    let address;
    if (index === 0 || index === e.target.length - 1) {
      location_name = '';
      address = '';
    } else {
      location_name = e.target[index].innerText;
      address = e.target[index].dataset.address + ' Oberlin OH';
    }
    this.setState(state => ({
      form: {
        ...state.form,
        address,
        location_name
      }
    }));
  }

  /**
   * Changes form's location_name and address based on user inputted address
   */
  changePlace(e) {
    // TODO(ML): Add this feature back in
    return;
    // location.selectedIndex = 0;
    const selector = document.getElementById('location-selector');
    const typed = e.target.value;
    let address = this.state.form.address;
    let location_name = this.state.form.location_name;
    for (let i = 1; i < selector.length - 1; i++) {
      if (
        typed === selector[i].innerText ||
        typed === selector[i].dataset.address
      ) {
        selector.selectedIndex = i;
        address = selector[i].dataset.address + ' Oberlin OH';
        location_name = selector[i].innerText;
        break;
      }
    }
    this.setState(state => ({
      form: {
        ...state.form,
        address,
        location_name
      }
    }));
  }

  changeWarningText(str) {
    this.setState({ warningText: str });
  }

  /* returns an object with the start_time and end_time converted to UTC
  and the created_at field set to the current time (in UTC) */
  calculateTime() {
    const newObj = Object.assign({}, this.state.form);
    const UTCStartTime = new Date(newObj.start_time)
      .toISOString()
      .substring(0, 16);
    const UTCEndTime = new Date(newObj.end_time).toISOString().substring(0, 16);
    newObj.start_time = UTCStartTime;
    newObj.end_time = UTCEndTime;
    newObj.created_at = new Date().toISOString().substring(0, 16);
    return newObj;
  }

  /* Sends a POST request to 3001/query with current state */
  handleSubmit() {
    // Erase any warning text
    this.changeWarningText('');

    // Checks that the 3 required field
    const form = this.state.form;
    if (!(form.start_time && form.title && form.address)) {
      this.changeWarningText(
        'Event Place, Start Date and Time and Address are required'
      );
      return;
    }

    const toSubmit = this.calculateTime();

    fetch(`http://obielocal.cs.oberlin.edu:3001/query`, {
      // fetch(`http://localhost:3001/query`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toSubmit)
    })
      .then(async res => {
        // console.log("res: ");
        // console.log(res);
        const resObject = await res.json();
        if (res.status === 200 && resObject.eventAdded) {
          this.props.fetchMarkers();
          this.props.toggleCreateEventContainer(false);
        }
        if (res.status === 200 && resObject.addressUnknown)
          this.changeWarningText('Address not found');
      })
      .catch(e => console.log('Error' + e));
  }

  render() {
    return (
      <StyledPane
        className={
          this.props.active
            ? 'Create-event-container-active'
            : 'Create-event-container-inactive'
        }
      >
        <h1>Create an Event</h1>
        <button
          type="button"
          onClick={() => this.props.toggleCreateEventContainer(false)}
          id="x"
        >
          X
        </button>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="input-title">Event Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="input-title"
                  name="title"
                  value={this.state.form.title || ''}
                  placeholder="President Ambar's Inauguration"
                  autoComplete="off"
                  onChange={this.handleChange('title')}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="input-description">Description:</label>
              </td>
              <td>
                <textarea
                  name="description"
                  id="input-description"
                  value={this.state.form.description || ''}
                  onChange={this.handleChange('description')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="input-start_time">Start Date and Time: </label>
              </td>
              <td>
                <input
                  type="datetime-local"
                  name="start_time"
                  id="input-start_time"
                  value={this.state.form.start_time}
                  onChange={this.handleChange('start_time')}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="input-end_time">End Date and Time: </label>
              </td>
              <td>
                <input
                  type="datetime-local"
                  name="end_time"
                  id="input-end_time"
                  value={this.state.form.end_time}
                  onChange={this.handleChange('end_time')}
                />
              </td>
            </tr>
            {/* <tr>
              <td>
                <label htmlFor="input-location_name">Location:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="location_name"
                  id="input-location_name"
                  value={this.state.form.location_name || ''}
                  placeholder="Finney Chapel"
                  autoComplete="off"
                  onChange={this.handleChange('location_name')}
                  required
                />
              </td>
            </tr> */}
            {/* TODO(ML): Implement the location_name input with react-tag-autocomplete */}
            <tr>
              <td>
                <label htmlFor="input-location_name">Location:</label>
              </td>
              <td>
                <ReactTags
                  type="text"
                  name="location_name"
                  id="input-location_name"
                  value={this.state.form.location_name || ''}
                  placeholder="Finney Chapel"
                  autoComplete="off"
                  onChange={this.handleChange('location_name')}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="input-address">Address: </label>
              </td>
              <td>
                <input
                  type="text"
                  name="address"
                  id="input-address"
                  value={this.state.form.address || ''}
                  placeholder="90 N Professor St, Oberlin, OH 44074"
                  autoComplete="off"
                  onChange={this.handleChange('address')}
                  required
                />
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <input
                  id="submit"
                  type="button"
                  value="Add Event"
                  onClick={this.handleSubmit}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <label htmlFor="submit" id="warning-text">
          {this.state.warningText}
        </label>
      </StyledPane>
    );
  }
}
