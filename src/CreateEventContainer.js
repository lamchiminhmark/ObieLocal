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
`;

export default class CreateEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => {
      const temp = {};
      temp[field] = e.target.value;
      this.setState(state => {
        return {form: Object.assign(state.form, temp)}
      });
      // console.log(this.state);
    };
  }

  /* Sends a POST request to 3001/query with current state */
  handleSubmit() {
    // Checks that the 3 required field 
    const form = this.state.form;
    if (!(form.start_time && form.title && form.address)) alert('Event Place, Start Date and Time and Address are required'); 
    fetch(`http://localhost:3001/query`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.form),
    })
    .then(async res => {
      // console.log("res: ");
      // console.log(res);
      const resObject = await res.json();
      if (res.status === 200 && resObject.eventAdded) {
        this.props.fetchMarkers();
        this.props.toggleCreateEventContainer(false);
      }
      if (res.status === 200 && resObject.addressUnknown) {}
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
              <input
                type="text"
                name="location_name"
                value={this.state.form.location_name || ''}
                onChange={this.handleChange('location_name')}
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
      </StyledPane>
    );
  }
}
