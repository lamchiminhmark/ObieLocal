import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledPane = styled.div`
  margin: 0px;
  padding: 0px;
  overflow: hidden auto;
  top: 60px;
  width: 25%;
  min-width: 150px;
  height: 85%;
  background-color: #fb6060e3;
  border: 3px solid white;
  border-right: 12px solid rgb(75, 75, 75);
  border-radius: 0px;
  border-style: inset;
  transition: all 1s;

  h1 {
    background-color: rgba(255, 184, 29, 0.7);
    cursor: default;
  }

  p {
    overflow: clip;
    cursor: default;
  }

  em {
    font-weight: bold;
  }

  img {
    max-width: 95%;
    margin: auto;
  }
`;

export default class Sidepane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventIdx: 0
    };

    this.getEventTimeString = this.getEventTimeString.bind(this);
  }

  getEventTimeString(eventIdx) {
    let startTime = 'Time unknown';
    let endTime;
    const dateTime = require('node-datetime');
    // TODO: (CP) Do we actually need to check for start time in the event
    // object here?
    if (this.props.eventArray[eventIdx].start_time) {
      /* Note that the Date constructor automatically adjusts for timezone */
      const startTimeUTC = new Date(this.props.eventArray[eventIdx].start_time);
      /*format times to display hour, minute, and period in 12 hour time*/
      startTime = dateTime.create(startTimeUTC, 'I:M p').format();
    }
    if (this.props.eventArray[eventIdx].end_time) {
        const endTimeUTC = new Date(this.props.eventArray[eventIdx].end_time);
        endTime = dateTime.create(endTimeUTC, 'I:M p').format();
    }
    endTime = endTime ? ` - ${endTime}` : ``;
    return `${startTime}${endTime}`;
  }

  render() {
    // const [startTime, endTime] = this.getEventTimes(this.state.eventIdx);
    /*construct strings to display in sidepane*/
    const timeString = this.getEventTimeString(this.state.eventIdx);
    const locationString = this.props.eventArray[this.state.eventIdx].address;
    const desc = this.props.eventArray[this.state.eventIdx].desc;

    return (
      <StyledPane
        className={this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        onClick={this.props.handleSidepaneClick}
      >
        <h1>{this.props.eventArray[this.state.eventIdx].title}</h1>
        <p>{desc}</p>
        <p className="event-details">
          <em>Where and When: </em>
          {`${locationString} ${timeString}`}
        </p>
        <img src={this.props.eventArray[this.state.eventIdx].photo_url} alt="" />
        {ReactHtmlParser(this.props.eventArray[this.state.eventIdx].description)}
      </StyledPane>
    );
  }
}
