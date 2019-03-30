// Movies.js

import React from "react";
import AgendaEventItem from "./AgendaEventItem"

import constants from './constants'

class AgendaEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [{title: "Event A Event A Event A Event A Event A Event A Event A Event A Event A Event A Event A Event A Event A Event A", photo_url: "https://d3e1o4bcbhmj8g.cloudfront.net/photos/837659/huge/3c6251828208716ba21dd0dcd8df81f7789a407b.jpg"
        , location_name: "Wilder 101", date: "April 4th", time: "12:30 PM", desc: "This is a very cool event which features a bunch of people doing something I don't know features features features feature This is a very cool event which features a bunch of people doing something I don't know features features features feature This is a very cool event which features a bunch of people doing something I don't know features features features feature v√This is a very cool event which features a bunch of people doing something I don't know features features features features"},
        {title: "Event A", photo_url: "https://d3e1o4bcbhmj8g.cloudfront.net/photos/837659/huge/3c6251828208716ba21dd0dcd8df81f7789a407b.jpg"
        , location_name: "Wilder 101", date: "April 4th", time: "12:30 PM", desc: "This is a very cool event which features a bunch of people doing something I don't know"},
        {title: "Event A", photo_url: "https://d3e1o4bcbhmj8g.cloudfront.net/photos/837659/huge/3c6251828208716ba21dd0dcd8df81f7789a407b.jpg"
        , location_name: "Wilder 101", date: "April 4th", time: "12:30 PM", desc: "This is a very cool event which features a bunch of people doing something I don't know"}]
        };
    }

    componentDidMount() {
        //this.fetchData();
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
