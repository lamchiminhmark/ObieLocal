// Movies.js

import React from "react";
import AgendaEventItem from "./AgendaEventItem"

import constants from './constants'

class AgendaEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://obielocal.cs.oberlin.edu:3001/query')
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
        const events = data.results.map(result => {
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
