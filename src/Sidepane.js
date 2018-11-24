import React, { Component } from "react";
import styled from "styled-components";

const StyledPane = styled.div`
  margin: 0px;
  padding: 0px;
  top: 60px;
  width: 25%;
  min-width: 150px;
  height: 85%;
  background-color: rgba(255, 0, 0, 0.6);
  border: 3px solid white;
  border-right: 12px solid rgb(75, 75, 75);
  border-radius: 0px;
  border-style: inset;
  transition: left 1s;
  h1,
  p {
    overflow: clip;
  }
  em {
    font-weight: bold;
  }
`;

class Sidepane extends Component {
  constructor() {
    super();
    var desc = "This is a sample description of an event.";
    var time = "April 20th, 2019 @ 4:20pm";
    this.state = {
      eventInfo: {
        title: "Event Title",
        desc: desc,
        time: time
      },
      active: true
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass(e) {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <StyledPane
        className={this.state.active ? "Sidepane-active" : "Sidepane-inactive"}
        onClick={this.toggleClass}
      >
        <h1>{this.state.eventInfo.title}</h1>
        <p>{this.state.eventInfo.desc}</p>
        <p className="event-details">
          <em>Where and When: </em>
          {this.state.eventInfo.time}
        </p>
      </StyledPane>
    );
  }
}

export default Sidepane;
