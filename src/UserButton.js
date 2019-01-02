import React, { Component } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faUser);

const Button = styled.button`
  position: fixed;
  top: 8px;
  right: 40px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 20%;
  /* background-color: rgba(255, 0, 0, 0.6); */
  background: rgba(255, 100, 100, 0.6);
  background: linear-gradient(
    180deg,
    rgba(255, 100, 100, 0.6) 0%,
    rgba(210, 50, 50, 0.6) 100%
  );
  cursor: pointer;

  #user-icon {
    padding: 10px;
  }

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

class UserButton extends Component {
  handleClick(e) {
    alert("You can't sign in just yet!");
  }

  render() {
    return (
      <Button className="UserButton" onClick={this.handleClick}>
        <FontAwesomeIcon id="user-icon" icon="user" size="3x" />
      </Button>
    );
  }
}

export default UserButton;
