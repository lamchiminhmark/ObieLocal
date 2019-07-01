/* Container */

import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { toggleEvent } from '../../actions/eventActions';
import EventSwitchButtons from './EventSwitchButtons';

class EventDetails {
  /**
   * Returns the time string to be displayed in the sidepane for an event in
   * the active event array.
   * @returns {String} The time string.
   */
  getEventTimeString() {
    let startTime = 'Time unknown.';
    let endTime;
    const dateTime = require('node-datetime');
    // TODO(CP): Do we actually need to check for start time in the event
    // object here? Also see AgendaEventItem.timeFormatter.
    if (this.props.event.start_time) {
      /* Note that the Date constructor automatically adjusts for timezone */
      const startTimeUTC = new Date(
        this.props.event.start_time
      );
      /*format times to display hour, minute, and period in 12 hour time*/
      startTime = dateTime.create(startTimeUTC, 'I:M p').format();
    }
    if (this.props.event.end_time) {
      const endTimeUTC = new Date(
        this.props.event.end_time
      );
      endTime = dateTime.create(endTimeUTC, 'I:M p').format();
    }
    endTime = endTime ? ` - ${endTime}` : ``;
    return `${startTime}${endTime}`;
  }

  render() {
    const timeString = this.getEventTimeString();
    const locationName = this.props.handleEventSwitch.location_name || '';
    const locationString = this.props.event.address || 'Location unknown.';

    return (
      <div label="Event">
        <h1>{this.props.selectedEventsArray[this.props.eventIdx].title}</h1>
        <EventSwitchButtons
          handleEventSwitch={this.props.toggleEvent}
          nextExists={this.props.nextExists}
          prevExists={this.props.prevExists}
        />
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
          src={this.props.selectedEventsArray[this.props.eventIdx].photo_url}
          alt=""
        />
        {ReactHtmlParser(
          this.props.selectedEventsArray[this.props.eventIdx].description
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => {
  const { selectedEventsArray, activeEventIdx } = events;
  return {
    event: selectedEventsArray[activeEventIdx],
    nextExists: selectedEventsArray.length - 1 > activeEventIdx,
    prevExists: activeEventIdx > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEvent: direction => () => dispatch(toggleEvent(direction))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails);
