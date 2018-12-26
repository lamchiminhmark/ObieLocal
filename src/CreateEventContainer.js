import React, { Component } from 'react';
import styled from 'styled-components';

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
      form: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeWarningText = this.changeWarningText.bind(this);
  }

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
          this.setState(state => {
            return { form: Object.assign(state.form, temp) };
          });
      }
    };
  }

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

  changePlace(e) {
    // location.selectedIndex = 0;
    const selector = document.getElementById('location-selector');
    const typed = e.target.value;
    let address = this.state.form.address;
    let location_name = this.state.form.location_name;
    for (let i = 1; i < selector.length - 1; i++) {
      if (typed === selector[i].innerText || typed === selector[i].dataset.address) {
        selector.selectedIndex = i;
        address = selector[i].dataset.address;
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
    const UTCStartTime = new Date(newObj.start_time).toISOString().substring(0, 16);
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
          <tr>
            <td>
              <label for="title">Event Name:</label>
            </td>
            <td>
              <input
                type="text"
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
              <label>Description:</label>
            </td>
            <td>
              <textarea
                name="description"
                value={this.state.form.description || ''}
                onChange={this.handleChange('description')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Start Date and Time: </label>
            </td>
            <td>
              <input
                type="datetime-local"
                name="start_time"
                value={this.state.form.start_time}
                onChange={this.handleChange('start_time')}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>End Date and Time: </label>
            </td>
            <td>
              <input
                type="datetime-local"
                name="end_time"
                value={this.state.form.end_time}
                onChange={this.handleChange('end_time')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Event Place: </label>
            </td>
            <td>
              <select
                id="location-selector"
                name="select_location"
                onChange={this.handleChange('select_location')}
              >
                <option value="none" data-address="" selected>Select a Location</option>
                <optgroup label="Residence Halls">
                  <option value="barrows" data-address="145 Woodland St">Barrows Hall</option>
                  <option value="dascomb" data-address="140 W College St">Dascomb Hall</option>
                  <option value="kahn" data-address="169 N Professor St">Kahn Hall</option>
                  <option value="langston" data-address="95 Union St">Langston Hall</option>
                  <option value="talcott" data-address="2 S Professor St">Talcott Hall</option>
                  <option value="burton" data-address="194 N Professor St">Burton Hall</option>
                  <option value="fairchild" data-address="93 Elm St">Fairchild Hall</option>
                  <option value="east" data-address="176 N Professor St">East Hall</option>
                  <option value="noah" data-address="167 Woodland St">Noah Hall</option>
                  <option value="south" data-address="121 Elm St">South Hall</option>
                  <option value="zechiel" data-address="207 Woodland St">Zechiel House</option>
                </optgroup>
                <optgroup label="Academic Buildings">
                  <option value="king" data-address="10 N Professor St">King Hall</option>
                </optgroup>
                <option value="other" data-address="">Other Location</option>
              </select>
            </td>
            {/* <td>
              <input
                type="text"
                name="location_name"
                value={this.state.form.location_name || ''}
                placeholder="Finney Chapel"
                autoComplete="off"
                onChange={this.handleChange('location_name')}
              />
            </td> */}
          </tr>
          <tr>
            <td>
              <label>Location Name</label>
            </td>
            <td>
              <input
                type="text"
                name="location_name"
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
              <label>Address: </label>
            </td>
            <td>
              <input
                type="text"
                name="address"
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
        </table>
        <text id="warning-text">{this.state.warningText}</text>
      </StyledPane>
    );
  }
}
