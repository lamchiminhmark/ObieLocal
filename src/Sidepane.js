import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledPane = styled.div`
  margin: 0px;
  padding: 0px;
  overflow: auto;
  top: 60px;
  width: 25%;
  min-width: 150px;
  height: 85%;
  background-color: rgba(255, 0, 0, 0.6);
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
`;

export default class Sidepane extends Component {
  render() {
    /*If there is no start time, display 'Time unknown.'*/
    var startTime = "Time unknown."

    if (this.props.eventInfo.start_time) {
      /*number of muliseconds in a minute*/
      const MS_PER_MINUTE = 60000;

      /*get time of event in universal standard time*/
      const startTimeUTC = new Date(this.props.eventInfo.start_time);

      /*get start time and end time, converting UTC to user's local time*/
      var offset = startTimeUTC.getTimezoneOffset();
      const startTimeLocal = new Date(startTimeUTC - offset * MS_PER_MINUTE).toString();
      const endTimeUTC = new Date(this.props.eventInfo.end_time);
      const endTimeLocal = new Date(endTimeUTC - offset * MS_PER_MINUTE).toString();
      /*format times to display hour, minute, and period in 12 hour time*/
      var dateTime = require('node-datetime');
      startTime = dateTime.create(startTimeLocal, 'I:M p').format();
      var endTime = dateTime.create(endTimeLocal, 'I:M p').format();
    }

    /*construct strings to display in sidepan*/
    const where = `${this.props.eventInfo.address}. ${startTime} ${endTime ? '-' + endTime : ''}`;
    const desc = this.props.eventInfo.desc;

    return (
      <StyledPane
        className={this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        onClick={this.props.handleSidepaneClick}
      >
        <h1>{this.props.eventInfo.title}</h1>
        <p>{desc}</p>
        <p className="event-details">
          <em>Where and When: </em>
          {where}
          </p>
          {ReactHtmlParser(this.props.eventInfo.description)}
      </StyledPane>
    );
  }
}
