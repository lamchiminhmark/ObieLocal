import React, { Component } from 'react';
import styled from 'styled-components';

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
  transition: all 1s;
  
  h1,
  p {
    overflow: clip;
  }
  em {
    font-weight: bold;
  }
`;

export default class Sidepane extends Component {
  constructor(props) {
    super(props);

    // COMMENT(ML): This component does not need to keep track of state of currentInfo
    this.state = {
      active: false
    };

    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass(e) {
    if (this.props.eventInfo.ID !== 0) this.setState({ active: !this.state.active });
    else (alert("You must select an event marker to view event information."))
  }

  render() {
    const where = this.props.eventInfo.time + '' + this.props.eventInfo.date;
    const desc = this.props.eventInfo.desc;

    return (
      <StyledPane
        className={this.state.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        onClick={this.toggleClass}
      >
        <h1>{this.props.eventInfo.title}</h1>
        <p>{desc}</p>
        <p className="event-details">
          <em>Where and When: </em>
          {where}
        </p>
      </StyledPane>
    );
  }
}
