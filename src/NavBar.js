import React, { Component } from "react";
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
    cursor: pointer;
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
  background: white;
  opacity: 0.7;
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

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner' ref={nodeInside => this.nodeInside = nodeInside}>
        <button onClick={this.props.closePopup} id = "x">
            X
        </button>
          <h1>{this.props.title}</h1>
          <p>
            {this.props.body}

        </p>
        </div>
      </div>
    );
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.nodeInside.contains(e.target)) {
      return;
    }
    else if (this.props.contact.contains(e.target)) {
      this.props.closePopup();
      this.props.openContact();
      return;
    }
    else if (this.props.about.contains(e.target)) {
      this.props.closePopup();
      this.props.openAbout();
      return;
    }
    else if (this.props.use.contains(e.target)) {
      this.props.closePopup();
      this.props.openUse();
      return;
    }
    else {
      this.props.closePopup();
    }
  }

}

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showAbout: false,
      showContact: false,
      showUse: false
    };
  }

  toggleAbout() {
    this.setState({
      showAbout: !this.state.showAbout
    });
  }

  toggleContact() {
    this.setState({
      showContact: !this.state.showContact
    });
  }

  toggleUse() {
    this.setState({
      showUse: !this.state.showUse
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
            <a onClick={this.toggleAbout.bind(this)} ref={nodeAbout => this.nodeAbout = nodeAbout}>About</a>
          </li>
          <li>
            <a onClick={this.toggleContact.bind(this)} ref={nodeContact => this.nodeContact = nodeContact}>Contact</a>
          </li>
          <li>
            <a onClick={this.toggleUse.bind(this)} ref={nodeUse => this.nodeUse = nodeUse}>How to Use</a>
          </li>
        </ul>

        {this.state.showAbout ?
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
        }
      </StyledNav>
    );
  }
}

export default NavBar;
