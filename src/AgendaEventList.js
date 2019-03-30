// Movies.js

import React from "react";
import AgendaEventItem from "./AgendaEventItem"

import constants from './constants'

class AgendaEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
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
          }
          )
          .catch(error => console.error('Loading agenda failed ', error));
      }

    storeEvents = data => {
        const events = data.map(result => {
          const  { title, photo_url, location_name, date, time, desc } = result;
          return { title, photo_url, location_name, date, time, desc };
        });
        this.setState({ events })
      }
    
        
    render() {
        return (
        <section>
            <ul className="AgendaEventList">
            {
                this.state.events.map( event => (
                <AgendaEventItem key={event.id} event={event} />
                ))
            }
            </ul>
        </section>
        );
    }   
}

export default AgendaEventList;
