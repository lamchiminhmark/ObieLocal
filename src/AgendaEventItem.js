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
  }

render() {
    const { title, photo_url, location_name, start_time, description } = this.props.event;
    const handleAgendaClick = this.props.handleAgendaClick;
    var events = [];
    events.push(this.props.event);
    console.log(events);
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
  
