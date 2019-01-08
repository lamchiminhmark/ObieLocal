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

const PaneBody = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Div = styled.div`
  position: absolute;
  width: 50%;
  min-width: 120px;
  top: 0px;
  right: 0px;

  button {
    position: absolute;
    background: lightblue;
    border: none;
    border-radius: 10px;
  }

  #button-prev-event {
    left: 25%;
  }

  #button-next-event {
    right: 25%;
  }
`;

export default class Sidepane extends Component {
  constructor(props) {
    super(props);
    this.getEventTimeString = this.getEventTimeString.bind(this);
    this.getEventSwitchButtons = this.getEventSwitchButtons.bind(this);
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

  getEventSwitchButtons() {
    let prevButton, nextButton;
    if (this.props.eventIdx < this.props.eventArray.length - 1) {
      nextButton = (
        <button id="button-next-event" onClick={this.props.handleEventSwitch}>
          >>
        </button>
      );
    }
    if (this.props.eventIdx > 0) {
      prevButton = (
        <button
          id="button-prev-event"
          onClick={this.props.handleEventSwitch}
        >{`<<`}</button>
      );
    }
    return (
      <Div id="multi-event-buttons">
        {prevButton}
        {nextButton}
      </Div>
    );
  }

  render() {
    const timeString = this.getEventTimeString(this.props.eventIdx);
    const locationString = this.props.eventArray[this.props.eventIdx].address;
    const desc = this.props.eventArray[this.props.eventIdx].desc;
    const eventSwitchButtons = this.getEventSwitchButtons();

    return (
      <StyledPane
        className={this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'}
      >
        <PaneBody onClick={this.props.handleSidepaneClick}>
          <h1>{this.props.eventArray[this.props.eventIdx].title}</h1>
          <p>{desc}</p>
          <p className="event-details">
            <em>Where and When: </em>
            {`${locationString} ${timeString}`}
          </p>
          <img
            src={this.props.eventArray[this.props.eventIdx].photo_url}
            alt=""
          />
          {ReactHtmlParser(
            this.props.eventArray[this.props.eventIdx].description
          )}
        </PaneBody>
        {eventSwitchButtons}
      </StyledPane>
    );
  }
}
