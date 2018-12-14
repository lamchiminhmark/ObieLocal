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

export default class CreateEventContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

  render() {
      return()
  }
}
