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
  `

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "none"
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(e) {
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
    let popup = null;
    if (this.state.show !== 'none') {
      popup = <Popup type={this.state.show} handleClose={this.togglePopup}/>;
    }
    
    return (
      <div className="contained">
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
      {popup}
      </div>
    );
  }
}

export default NavBar;
