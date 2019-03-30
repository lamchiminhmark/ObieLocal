import React from "react";
import "./AgendaEventItem.css";
import ReactHtmlParser from 'react-html-parser';

const AgendaEventItem = ({ event }) => {
    const { title, photo_url, location_name, start_time, description } = event;
  
    return (
      <li className="agenda-event-item">
        <div className="event-img-title">
          <img src={photo_url} alt={title} />
          <div className="event-title"><h2>{title}</h2></div>
        </div>
        <div className="event-text">
          <div className="agenda-event-desc">
            {ReactHtmlParser(description)}
          </div>
          <section className="agenda-event-details">
            <div className="location">
              <span className="location-title">Location: </span>
              <span>{location_name}</span>
            </div>
            <div className="date_time">
              <span className="date_time_title">Time and Date</span>
              <span>{start_time}</span>
            </div>
          </section>
        </div>
      </li>
    );
  }
  
  export default AgendaEventItem;
  
