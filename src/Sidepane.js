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
  render() {
    /*If there is no start time, display 'Time unknown.'*/
    var startTime = 'Time unknown.';

    if (this.props.eventArray[0].start_time) {
      /* Note that the Date constructor automatically adjusts for timezone */
      const startTimeUTC = new Date(this.props.eventArray[0].start_time);
      const endTimeUTC = new Date(this.props.eventArray[0].end_time);

      var dateTime = require('node-datetime');
      /*format times to display hour, minute, and period in 12 hour time*/
      startTime = dateTime.create(startTimeUTC, 'I:M p').format();
      var endTime = dateTime.create(endTimeUTC, 'I:M p').format();
    }

    /*construct strings to display in sidepan*/
    const where = `${this.props.eventArray[0].address}. ${startTime} ${
      endTime ? '- ' + endTime : ''
    }`;
    const desc = this.props.eventArray[0].desc;

    return (
      <StyledPane
        className={this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        onClick={this.props.handleSidepaneClick}
      >
        <h1>{this.props.eventArray[0].title}</h1>
        <p>{desc}</p>
        <p className="event-details">
          <em>Where and When: </em>
          {where}
        </p>
        <img src={this.props.eventArray[0].photo_url} alt="" />
        {ReactHtmlParser(this.props.eventArray[0].description)}
      </StyledPane>
    );
  }
}
