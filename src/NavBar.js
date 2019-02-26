import React, { Component } from 'react';
import Popup from './Popup';
import styled from 'styled-components';

const StyledNav = styled.div`
  background: linear-gradient(#ff7873, #ef3b43);
  position: fixed;
  top: 0px;
  z-index: 1;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    border-right: 2px solid rgb(75, 75, 75);
    border-bottom: 2px solid rgb(75, 75, 75);
  }

  li {
    padding: 7px 3px;
  }

  button {
    padding: 10px;
    border: 2px solid rgb(25, 25, 25);
    background-color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    color: black;
  }

  button:hover {
    background-color: rgba(200, 200, 200, 0.9);
  }
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'none'
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(e) {
    const name = e.target.getAttribute('id');
    switch (name) {
      case 'aboutBtn':
        this.setState({ show: 'about' });
        break;
      case 'contactBtn':
        this.setState({ show: 'contact' });
        break;
      case 'useBtn':
        this.setState({ show: 'use' });
        break;
      default:
        this.setState({ show: 'none' });
    }
  }

  render() {
    let popupElement = null;
    if (this.state.show !== 'none') {
      popupElement = (
        <Popup type={this.state.show} handleClose={this.togglePopup} />
      );
    }

    return (
      <StyledNav id="navbar">
        <ul>
          <li key="1">
            <button id="aboutBtn" onClick={this.togglePopup}>
              About
            </button>
          </li>
          <li key="2">
            <button id="contactBtn" onClick={this.togglePopup}>
              Contact
            </button>
          </li>
          <li key="3">
            <button id="useBtn" onClick={this.togglePopup}>
              How to Use
            </button>
          </li>
        </ul>
        {popupElement}
      </StyledNav>
    );
  }
}

export default NavBar;
