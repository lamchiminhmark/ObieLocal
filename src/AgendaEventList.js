import React from 'react';
import AgendaEventItem from './AgendaEventItem';

class AgendaEventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('https://obielocal-1541269219020.appspot.com/query')
      // fetch("http://localhost:3001/query")
      .then(response => response.json())
      .then(data => {
        this.storeEvents(data);
        console.log(data);
      })
      .catch(error => console.error('Loading agenda failed ', error));
  }

  //Push fetched data into events, verified events come first.
  storeEvents = data => {
    const events = data.map(result => {
      const {
        id,
        title,
        photo_url,
        location_name,
        start_time,
        end_time,
        description,
        address,
        verified
      } = result;
      return {
        id,
        title,
        photo_url,
        location_name,
        start_time,
        end_time,
        description,
        address,
        verified
      };
    });
    events.sort(function(a, b) {
      return a.verified - b.verified;
    });
    this.setState({ events });
  };

  render() {
    return (
      <section>
        <ul className="AgendaEventList">
          {this.state.events.map(event => (
            <AgendaEventItem
              key={event.id}
              event={event}
              handleAgendaClick={this.props.handleAgendaClick}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default AgendaEventList;
