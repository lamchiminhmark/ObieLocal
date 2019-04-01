import React from "react";
import "./AgendaEventItem.css";
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const SeeMoreButton = styled.button`
  outline: none;
  border: none;
  padding: 10px 10px;
  right: 0px;
  margin: 5px;
  background-color: #cedd0e;
  color: #555;
  font-weight: bold;
  
  :hover {
    background-color: #303030;
    color: #ededed;
  }
`;

class AgendaEventItem extends React.Component {
  constructor(props) {
      super(props);
      this.timeFormatter = this.timeFormatter.bind(this);
  }

timeFormatter(start, end) {
  let startTime = 'Time unknown.';
  let endTime;
  var startDate;
  const dateTime = require('node-datetime');
    // TODO: (CP) Do we actually need to check for start time in the event
    // object here?
  if (start) {
      /* Note that the Date constructor automatically adjusts for timezone */
      const startTimeUTC = new Date(start);
      /*format times to display hour, minute, and period in 12 hour time*/
      startTime = dateTime.create(startTimeUTC, 'I:M p').format();
      startDate = dateTime.create(startTimeUTC, 'n d').format();
    }
    if (end) {
      const endTimeUTC = new Date(end);
      endTime = dateTime.create(endTimeUTC, 'I:M p').format();
    }
    endTime = endTime ? ` - ${endTime}` : ``;
    
    return `${startDate}, ${startTime}${endTime}`;
}

render() {
    const { title, photo_url, location_name, start_time, end_time, description, verified} = this.props.event;
    var events = [];
    events.push(this.props.event);
    console.log(events);
    /*All roads specific function */
    const titleAllRoad = () => (
      <div className="event-title-allroad">
          <h2>{title}</h2>
          <img 
            src="https://www.oberlin.edu/sites/default/files/styles/width_760/public/content/basic-page/header-image/all-roads-graphic-760.png?itok=oi9qcVb-" alt="All Roads Lead to Oberlin" />
          
      </div>
    )
    const titleNormal = () => (
      <div className="event-title">
      <h2>{title}</h2>
    </div>
    )

    const defaultImg = "https://d3e1o4bcbhmj8g.cloudfront.net/photos/204534/huge/ee2941c721f2cc491db9f4fb3abdf034ccad369c.jpg"
    
    //If photo_url is null then set it to default image
    let photoURL;
    if (photo_url) {
      photoURL = photo_url
    }
    else {
      photoURL = defaultImg
    }

    const whichTitle = () => {
      if (!verified) {return titleAllRoad()} else {return titleNormal()}
    }

    return (
      <li className="agenda-event-item">
        <div className="event-img-title">
          <img src={photoURL} alt={title} />
         {whichTitle()}
        </div>
        <div className="event-text">
          <div className="agenda-event-desc">
            {ReactHtmlParser(description)}
          </div>
          <section className="agenda-event-details">
            <div className="location">
              <span className="location-title">Where? - </span>
              <span>{location_name}</span>
            </div>
            <div className="date_time">
              <span className="date_time_title">When? - </span>
              <span>{this.timeFormatter(start_time,end_time)}</span>
            </div>
            <SeeMoreButton onClick={() => this.props.handleAgendaClick(events)}>
              See details >>
            </SeeMoreButton>
          </section>
        </div>
      </li>
    );
  }
}
  
  export default AgendaEventItem;
  
