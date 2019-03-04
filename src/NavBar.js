import React, { Component } from 'react';
import Popup from './Popup';
import styled from 'styled-components';

const StyledNav = styled.div`
  background: #222222;
  position: fixed;
  top: 0px;
  z-index: 1;
  width: 100%;

  ul {
    font-family: 'Varela Round', sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: right;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0px;
    margin: auto;
  }

  li {
    padding: 0;
  }

  button {
    color: white;
    padding: 1vh;
    border-top: none;
    border-bottom: none;
    border-right: 1px solid whitesmoke;
    border-left: 1px solid whitesmoke;
    background-color: rgba(255, 255, 255, 0);
    text-decoration: none;
    box-shadow: none;
    font-size: 20px;
  }

  button:hover {
    /* background-color: rgba(255, 255, 255, 0.2); */
    color: var(--oberlin-red);
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
        </ul>
        {popupElement}
      </StyledNav>
    );
  }
}

export default NavBar;
