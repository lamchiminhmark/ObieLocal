import React, { Component } from "react";
import Popup from './Popup';
import styled from "styled-components";
/*import App from "./App.js"; */

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

  button {
    padding: 10px;
    border: 3px solid black;
    background-color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    color: black;
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
  /*background-color: rgba(0,0,0, 0.5);*/
}
.popup_inner {
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  background: rgba(100,100,100,0.7);
  border: 5px solid rgba(70,70,70, 0.7);
  border-radius: 5px;
}

#x {
    position: relative;
    float: right;
	  color: #DC143C;
    width: 6.5%;
    height: 10%;
    opacity: 0.7;
    /*background-color:#F2F2F2;*/
    border: none;
    background-color: rgba(255, 255, 255, 0.9);
    /*
    background:rgb(0,0,0);

    background:rgba(0,0,0,0.4);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#66000000,endColorstr=#66000000);
    zoom: 1;  */
}
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "none"
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(e) {
    e.preventDefault();
    const name = e.target.getAttribute("id");
    switch(name) {
      case "aboutBtn":
        this.setState({show: "about"});
        break;
      case "contactBtn":
        this.setState({show: "contact"});
        break;
      case "useBtn":
        this.setState({show: "use"});
        break;
      default:
        this.setState({show: "none"});
    }
  }

  render() {
    return (
      <StyledNav className="NavBar">
        <ul>
          {/* <div ref={nodeAbout => this.nodeAbout = nodeAbout}> */}
            <li key="1">
              <button id="aboutBtn" onClick={this.togglePopup}>About</button>
            </li>
          {/* </div> */}
          {/* <div ref={nodeContact => this.nodeContact = nodeContact}> */}
            <li key="2">
              <button id="contactBtn" onClick={this.togglePopup}>Contact</button>
            </li>
          {/* </div> */}
          {/* <div ref={nodeUse => this.nodeUse = nodeUse}> */}
            <li key="3">
              <button id="useBtn" onClick={this.togglePopup}>How to Use</button>
            </li>
          {/* </div> */}
        </ul>

        <Popup type={this.state.show} handler={this.togglePopup}/>

        {/* {this.state.showAbout ?
          <Popup
            title='About'
            body="ObieLocal is a web service made by Oberlin students to help other students find events on campus. ObieLocal is currently
                 being developed by Colton Potter, Minh Lam, Lukas Griffin, and Thomas Nemeh for their CSCI 241 final project."
            closePopup={this.toggleAbout.bind(this)} openAbout={this.toggleAbout.bind(this)} openContact={this.toggleContact.bind(this)}
            openUse={this.toggleUse.bind(this)} about={this.nodeAbout} contact={this.nodeContact} use={this.nodeUse}
          />
          : null
        }

        {this.state.showContact ?
          <Popup
            title='Contact'
            body='Please send any comments, questions, or concerns to Tnemeh@oberlin.edu'
            closePopup={this.toggleContact.bind(this)} openAbout={this.toggleAbout.bind(this)} openContact={this.toggleContact.bind(this)}
            openUse={this.toggleUse.bind(this)} about={this.nodeAbout} contact={this.nodeContact} use={this.nodeUse}
          />
          : null
        }

        {this.state.showUse ?
          <Popup
            title='How to use'
            body='Click on a pin and information for an event will be displayed.'
            closePopup={this.toggleUse.bind(this)} openAbout={this.toggleAbout.bind(this)} openContact={this.toggleContact.bind(this)}
            openUse={this.toggleUse.bind(this)} about={this.nodeAbout} contact={this.nodeContact} use={this.nodeUse}
          />
          : null
        } */}
      </StyledNav>
    );
  }
}

export default NavBar;
