import React from 'react';
import AgendaEventItem from './AgendaEventItem';

const AgendaEventList = props => {
  // Sort events by not-verified first
  const sortedEvents = [...props.events].sort(
    (event1, event2) => event1.verified - event2.verified
  );

  return (
    <section>
      <ul className="AgendaEventList">
        {sortedEvents.map(event => (
          <AgendaEventItem
            key={event.id}
            event={event}
            handleAgendaClick={props.handleAgendaClick}
          />
        ))}
      </ul>
    </section>
  );
};

export default AgendaEventList;
