import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { StyledUserButton } from './styles';
library.add(faUser);

class UserButton extends Component {
  handleClick(e) {
    alert("You can't sign in just yet!");
  }

  render() {
    return (
      <StyledUserButton className="UserButton" onClick={this.handleClick}>
        <FontAwesomeIcon id="user-icon" icon="user" size="3x" />
      </StyledUserButton>
    );
  }
}

export default UserButton;
