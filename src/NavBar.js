import React, { Component } from "react";
import styled from "styled-components";

const StyledNav = styled.div`
  background-color: rgba(255, 0, 0, 0.6);
  position: fixed;
  top: 0px;

  ul {
    /* display: inline-block; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;
    /* background-color:  */
    padding: 0px;
    margin: 0px;
    /* width: 100%; */
  }

  li {
    /* display: inline; */
    padding: 15px 1px;
  }

  a {
    padding: 10px;
    border: 3px solid black;
    background-color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    color: black;
  }

  a:hover {
    background-color: rgba(200, 200, 200, 0.9);
  }

  button {
    padding: 10px;
    border: 3px solid black;
    background-color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    color: black;
    display: inline-block;
    height: 50px;
  }

  button:hover {
    background-color: rgba(200, 200, 200, 0.9);
  }

  .popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.5);
}
.popup_inner {
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  background: white;
}
`;

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <StyledNav className="NavBar">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a onClick={this.togglePopup.bind(this)}>About</a>
          </li>
          <li>
            <a onClick={this.togglePopup.bind(this)}>Contact</a>
          </li>
          <li>
            <a onClick={this.togglePopup.bind(this)}>How to Use</a>
          </li>
        </ul>

        {this.state.showPopup ?
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </StyledNav>
    );
  }
}

export default NavBar;
