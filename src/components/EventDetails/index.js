import React from 'react';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

const EventDetails = (props) => {
  let match = useRouteMatch();

  let children;
  // console.log(props.events);
  if (props.events) {
    children = props.events.map((event) => {
      return <li>{JSON.stringify(event)}</li>;
    });
  } else {
    children = null;
  }

  return (
    <div id="event-details-div">
      <Switch>
        <Route path={`${match.path}/:eventId`}>
          <Event {...props} />
        </Route>
        <Route path={match.path}>
          <p>Hello, world!</p>
          <ul>{children}</ul>
        </Route>
      </Switch>
    </div>
  );
};

const Event = (props) => {
  let { eventId } = useParams();
  // const event = props.events ? props.events[eventId] : null;

  return <h1>Matched event id: {eventId}</h1>;
};

export default connect(({ firestore }) => ({
  events: firestore.ordered && firestore.ordered.events,
}))(EventDetails);
