import React, { Component } from 'react';
import styled from 'styled-components';

const StyledPane = styled.form`
  margin: 0px;
  padding: 0px;
  top: 60px;
  width: 80%;
  min-width: 90vw;
  height: 80vh;
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

export default class CreateEventContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      this.setState({title: e.target.value});
    }

  render() {
      return(<StyledPane
        className={this.props.active ? 'Create-event-container-active' : 'Create-event-container-inactive'}
        action="http://localhost:3001/query"
        method="post"
    >
      <label>
        Event Name: 
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
      </label>
      <input type="submit" value="Add Event"/>
      </StyledPane>)
  }
}
