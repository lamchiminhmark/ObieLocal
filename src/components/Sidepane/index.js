import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Tabs from './Tabs';
import '../../styles/tabs.css';
import SidepaneCloseButton from './SidepaneCloseButton';
import AgendaEventList from './AgendaEventList';
import {
  StyledPane,
  StyledPaneBody,
  EventSwitchButtons,
  PrevButton,
  NextButton,
  EventNumber
} from './styles';

export default class Sidepane extends Component {
  constructor(props) {
    super(props);
    this.getEventTimeString = this.getEventTimeString.bind(this);
    this.getEventSwitchButtons = this.getEventSwitchButtons.bind(this);
  }

  /**
   * Returns the time string to be displayed in the sidepane for an event in
   * the active event array.
   * @param {Number} eventIdx An index of the event array.
   * @returns {String} The time string.
   */
  getEventTimeString(eventIdx) {
    let startTime = 'Time unknown.';
    let endTime;
    const dateTime = require('node-datetime');
    // TODO(CP): Do we actually need to check for start time in the event
    // object here? Also see AgendaEventItem.timeFormatter.
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

  /**
   * Determines whether there are multiple events at the current location and
   * creates buttons to switch through them if necessary.
   * @returns {JSX.Element} A div with 0 or 2 styled buttons.
   */
  // TODO(CP): Make this code cleaner
  getEventSwitchButtons() {
    const isPrevEvent = this.props.eventIdx > 0;
    const isNextEvent =
      this.props.eventIdx < this.props.eventArray.length - 1 ? true : false;
    if (!isNextEvent && !isPrevEvent) return null;

    const LIGHT_GREEN = '#cedd0e';
    const LIGHT_GREEN_HL = '#dceb0f';
    const LIGHT_GRAY = '#d7d7d7';
    const BOX_SHADOW = '0 2px 3px rgb(0, 0, 0, 0.50)';

    const prevProps = {
      onClick: isPrevEvent ? this.props.handleEventSwitch : null,
      bgColor: isPrevEvent ? LIGHT_GREEN : LIGHT_GRAY,
      bgHighlight: isPrevEvent ? LIGHT_GREEN_HL : null,
      cursor: isPrevEvent ? 'pointer' : 'default',
      boxShadow: isPrevEvent ? BOX_SHADOW : 'none',
      opacity: isPrevEvent ? '1' : '0.5'
    };

    const nextProps = {
      onClick: isNextEvent ? this.props.handleEventSwitch : null,
      bgColor: isNextEvent ? LIGHT_GREEN : LIGHT_GRAY,
      bgHighlight: isNextEvent ? LIGHT_GREEN_HL : null,
      cursor: isNextEvent ? 'pointer' : 'default',
      boxShadow: isNextEvent ? BOX_SHADOW : 'none',
      opacity: isNextEvent ? '1' : '0.5'
    };

    return (
      <EventSwitchButtons id="multi-event-buttons">
        <PrevButton id="button-prev-event" {...prevProps}>
          {`<<`}
        </PrevButton>
        <EventNumber>
          {this.props.eventIdx + 1}/{this.props.eventArray.length}
        </EventNumber>
        <NextButton id={'button-next-event'} {...nextProps}>
          >>
        </NextButton>
      </EventSwitchButtons>
    );
  }

  render() {
    const timeString = this.getEventTimeString(this.props.eventIdx);
    const locationName =
      this.props.eventArray[this.props.eventIdx].location_name || '';
    const locationString =
      this.props.eventArray[this.props.eventIdx].address || 'Location unknown.';
    const EventSwitchButtons = this.getEventSwitchButtons();
    /* If no event is selected */
    if (this.props.eventArray[0].ID === 0)
      return (
        <StyledPane
          className={
            this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'
          }
          id="sidepane"
        >
          <StyledPaneBody>
            <Tabs activeTab={this.props.activeTab}>
              {/* Event Tab */}
              <div label="Event">
                <p>Please select an event to view details</p>
              </div>
              {/* Agenda Tab */}
              <div label="Agenda">
                <AgendaEventList
                  events={this.props.events}
                  checkEventTimes={this.props.checkEventTimes}
                  handleAgendaClick={this.props.handleAgendaClick}
                  timeFormatter={this.getEventTimeString}
                />
              </div>
            </Tabs>
          </StyledPaneBody>
          <SidepaneCloseButton
            id="sidepane-close"
            handleSidepaneClick={this.props.handleSidepaneClick}
          />
        </StyledPane>
      );
    else
      return (
        <StyledPane
          className={
            this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'
          }
        >
          <StyledPaneBody>
            <Tabs activeTab={this.props.activeTab}>
              {/* Event Tab */}
              <div label="Event">
                <h1>{this.props.eventArray[this.props.eventIdx].title}</h1>
                {EventSwitchButtons}
                <p className="event-details">
                  <em>Where and When: </em>
                  <br />
                  {`${locationName}`}
                  <br />
                  {`${locationString}`}
                  <br />
                  {`Today! ${timeString}`}
                </p>
                <img
                  className="event-img"
                  src={this.props.eventArray[this.props.eventIdx].photo_url}
                  alt=""
                />
                {ReactHtmlParser(
                  this.props.eventArray[this.props.eventIdx].description
                )}
              </div>
              {/* Agenda Tab */}
              <div label="Agenda">
                <AgendaEventList
                  events={this.props.events}
                  checkEventTimes={this.props.checkEventTimes}
                  handleAgendaClick={this.props.handleAgendaClick}
                  timeFormatter={this.getEventTimeString}
                />
              </div>
            </Tabs>
          </StyledPaneBody>
          <SidepaneCloseButton
            handleSidepaneClick={this.props.handleSidepaneClick}
            id="sidepane-close"
          />
        </StyledPane>
      );
  }
}
