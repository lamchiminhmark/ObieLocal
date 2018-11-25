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
    this.state = {
      eventInfo: {},
      active: true
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass(e) {
    this.setState({ active: !this.state.active });
  }

  componentDidMount() {
    this.setState({ eventInfo: this.props.eventInfo });
  }
  /* componentDidMount() {
    fetch('/query')
      .then(res => res.json())
      .then(json => json[0])
      .then(event => {
        console.log(event);
        this.setState({ eventInfo: event });
      })
      .catch(err => console.log(err));
  } */

  render() {
    const where = this.state.eventInfo.time + '' + this.state.eventInfo.date;
    const desc = this.state.eventInfo.desc;

    return (
      <StyledPane
        className={this.state.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        onClick={this.toggleClass}
      >
        <h1>{this.state.eventInfo.title}</h1>
        <p>{desc}</p>
        <p className="event-details">
          <em>Where and When: </em>
          {where}
        </p>
      </StyledPane>
    );
  }
}

export default Sidepane;
