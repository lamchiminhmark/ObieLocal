import React from 'react';
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  Link,
  useHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledEventsDiv = styled.div`
  ul {
    display: block;
    list-style-type: decimal;
  }

  a,
  a:visited {
    text-decoration: none;
    color: inherit;
  }

  button {
    margin: auto;
  }
`;

const BrowserNavButtons = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={history.goBack}>{'<<<'}</button>
      <button onClick={history.goForward}>{'>>>'}</button>
    </div>
  );
};

const EventDetailsWrapper = (props) => {
  const match = useRouteMatch();

  let allEvents;
  if (props.events) {
    allEvents = [];
    for (const event in props.events) {
      allEvents.push(
        <Link to={`${match.path}/${event}`}>
          <li>
            <span style={{ fontWeight: 'bold' }}>
              {props.events[event].title}
            </span>
            <br />
            id: {event}
          </li>
        </Link>
      );
    }
  } else {
    allEvents = 'Loading...';
  }

  return (
    <StyledEventsDiv id="event-details-div">
      <Switch>
        <Route path={`${match.path}/:eventId`}>
          <EventDetails {...props} />
        </Route>
        <Route path={match.path}>
          <h1>All Events</h1>
          <ul>{allEvents}</ul>
        </Route>
      </Switch>
      <BrowserNavButtons />
    </StyledEventsDiv>
  );
};

const EventDetails = (props) => {
  let { eventId } = useParams();
  const event = props.events ? props.events[eventId] : null;

  return (
    <div>
      <h1>{event ? event['title'] : 'Loading...'}</h1>
      <p>{JSON.stringify(event)}</p>
    </div>
  );
};

export default connect(({ firestore }) => ({
  events: firestore.data && firestore.data.events,
}))(EventDetailsWrapper);
