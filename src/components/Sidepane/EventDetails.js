/* Container */

import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { toggleEvent } from '../../actions/markerActions';
import EventSwitchButtons from './EventSwitchButtons';
import { StyledSeeMoreButton } from './styles';
import { rateEvent } from '../../actions/recommenderActions';

class EventDetails extends React.Component {
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
    if (!this.props.event.start_time) {
      return startTime;
    }
    /* Note that the Date constructor automatically adjusts for timezone */
    startTime = new Date(this.props.event.start_time);
    /*format times to display hour, minute, and period in 12 hour time*/
    const startHour = dateTime.create(startTime, 'I:M p').format();

    if (this.props.event.end_time) {
      const endTimeUTC = new Date(this.props.event.end_time);
      endTime = dateTime.create(endTimeUTC, 'I:M p').format();
    }
    endTime = endTime ? ` - ${endTime}` : ``;

    const dayInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date =
      dayInWeek[startTime.getDay()] +
      ' ' +
      (startTime.getMonth() + 1) +
      '/' +
      startTime.getDate();
    console.log(startTime);
    return `${date}, ${startHour}${endTime}`;
  }

  render() {
    const { event, toggleEvent, totalEvents, activeEventIdx } = this.props;
    const timeString = this.getEventTimeString();
    const locationName = event.location_name || '';
    const locationString = event.address || 'Location unknown.';
    //TODO: Get real userId
    const userId = 1;

    return (
      <div>
        <h1>{event.title}</h1>
        <EventSwitchButtons
          handleEventSwitch={toggleEvent}
          totalEvents={totalEvents}
          eventIdx={activeEventIdx}
        />
        <p className="event-details">
          <em>Where and When: </em>
          <br />
          {`${locationName}`}
          <br />
          {`${locationString}`}
          <br />
          {`${timeString}`}
        </p>
        <img className="event-img" src={event.photo_url} alt="" />
        {ReactHtmlParser(event.description)}
        <StyledSeeMoreButton onClick={() => this.props.rateEvent(userId, event.filters.event_types, 'like')}>I'm interested</StyledSeeMoreButton>
      </div>
    );
  }
}

const mapStateToProps = ({ markers }) => {
  const { selectedEventsArray, activeEventIdx } = markers;
  return {
    event: selectedEventsArray[activeEventIdx],
    totalEvents: selectedEventsArray.length,
    activeEventIdx
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rateEvent: event => () => dispatch(rateEvent(event)),
    toggleEvent: direction => () => dispatch(toggleEvent(direction))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
