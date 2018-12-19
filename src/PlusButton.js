import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  background: rgba(255, 100, 100, 0.6);
  color: black;
  position: fixed;
  bottom: 40px;
  right: 40px;
  font-size: 20px;
  cursor: pointer;

  :hover {
    /* background: rgb(255,100,100); */
    background: linear-gradient(
      180deg,
      rgba(210, 50, 50, 0.6) 0%,
      rgba(165, 25, 25, 0.6) 100%
    );
  }
  :focus {
    outline: 0;
  }
`;

class PlusButton extends Component {
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.props.toggleCreateEventContainer(true);
            this.props.toggleSidepane({ close: true });
          }}
        >
          +
        </Button>
      </div>
    );
  }
}

export default PlusButton;
