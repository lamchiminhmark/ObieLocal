import React from "react";
import AgendaEventList from "./AgendaEventList"


const AgendaEventItem = ({ event }) => {
    const { title, photo_url, location_name, date, time, desc } = event;
  
    return (
      <li className="agenda-event-item">
        <img src={photo_url} alt={title} />
        <div className="event-title">
          <h2>{title}</h2>
          <p>{desc}</p>
          <section className="event-details">
            <div className="location">
              <span className="location-title">Location: </span>
              <span>{location_name}</span>
            </div>
            <div className="date_time">
              <span className="title">Time and Date</span>
              <span>{time} {date}</span>
            </div>
          </section>
        </div>
      </li>
    );
  }
  
  export default AgendaEventItem;
  
