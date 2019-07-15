/* Container */

import React from 'react';
import { connect } from 'react-redux';
import { setSelectedEvents } from '../../actions/eventActions';
import { recenterMap } from '../../actions/mapActions';
import ReactGA from 'react-ga';
import AgendaEventItem from './AgendaEventItem';

class AgendaEventList extends React.Component {
  handleAgendaClick = event => () => {
    ReactGA.event({
      category: 'User',
      action: 'Agenda Click',
      label: event.title
    });
    // dispatch({
    this.props.setSelectedEvents([event]);
    this.props.centerOnEvent(event);
  };

  render() {
    // Sort events by not-verified first
    const sortedEvents = [...this.props.events].sort((event1, event2) =>
      event1.verified === event2.verified
        ? new Date(event1.start_time) - new Date(event2.start_time)
        : event1.verified - event2.verified
    );

    return (
      <div>
        <section>
          <ul className="AgendaEventList">
            {sortedEvents.map(event => (
              <AgendaEventItem
                key={event.ID}
                handleAgendaClick={this.handleAgendaClick(event)}
                event={event}
              />
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => {
  // Flatten each marker
  const allEvents = events.allMarkers.reduce((soFar, marker) => {
    // Add coordinates to the 1 or more events in a marker
    const eventsWithCoor = marker.events.map(event => ({
      ...event,
      lat: marker.geo.latitude,
      lng: marker.geo.longitude
    }));
    return soFar.concat(eventsWithCoor);
  }, []);

  return {
    events: allEvents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedEvents: activeEventArray =>
      // TODO(ML): Add optional arg to setSelectedEvents to know which of the many events to go to
      dispatch(setSelectedEvents(activeEventArray)),
    centerOnEvent: event =>
      dispatch(
        recenterMap({
          lat: event.lat,
          lng: event.lng
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaEventList);
