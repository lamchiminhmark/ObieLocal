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

  h1,
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
  }

  label {
    display: block;
    margin:auto;
  }

  #submit {
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
    float: center;
  }
`;

export default class CreateEventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',  
      start_time: '',
      end_time: '',
      location_name: '',
      address: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return e => {
      const temp = {};
      temp[field] = e.target.value;
      this.setState(temp);
      // console.log(this.state);
    };
  }

  // TODO(ML): Make sure after form is submitted, website doesn't go to new page
  render() {
    return (
      <StyledPane
        className={
          this.props.active
            ? 'Create-event-container-active'
            : 'Create-event-container-inactive'
        }
        action="http://localhost:3001/query"
        method="post"
      >
        <button
          type="button"
          onClick={() => this.props.toggleCreateEventContainer(false)}
          id="x"
        >
          X
        </button>
        <label>
          Event Name:
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange('title')}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange('description')}
          />
          </label>
          <label>
          Start Date and Time:
          <input
            type="datetime-local"
            name="start_time"
            value={this.state.start_time}
            onChange={this.handleChange('start_time')}
          />
        </label>
        <label>
          End Date and Time:
          <input
            type="datetime-local"
            name="end_time"
            value={this.state.end_time}
            onChange={this.handleChange('end_time')}
          />
        </label>
        <label>
          Event Place:
          <input
            type="text"
            name="location_name"
            value={this.state.location_name}
            onChange={this.handleChange('location_name')}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleChange('address')}
          />
        <input id="submit" type="submit" value="Add Event" />
        </label>
      </StyledPane>
    );
  }
}
