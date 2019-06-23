import React from 'react';
import AgendaEventItem from './AgendaEventItem';

const AgendaEventList = props => {
  // Sort events by not-verified first
  const sortedEvents = [...props.events].sort((event1, event2) =>
    event1.verified === event2.verified
      ? new Date(event1.start_time) - new Date(event2.start_time)
      : event1.verified - event2.verified
  );

  return (
    <section>
      <ul className="AgendaEventList">
        {sortedEvents.map(event => (
          <AgendaEventItem
            key={event.ID}
            lat={event.lat}
            lng={event.lng}
            event={event}
          />
        ))}
      </ul>
    </section>
  );
};

export default AgendaEventList;
