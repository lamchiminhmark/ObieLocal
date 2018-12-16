import React from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div`
  .popup {
    position: fixed;
    width: 60%;
    height: 60%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(60,60,60,0.7);
    border: 5px solid rgba(35,35,35,0.7);
    border-radius: 14px;
  }

  #x {
    position: relative;
    float: right;
    color: #ffffff;
    width: 10.5%;
    height: 10%;
    opacity: 0.8;
    cursor: pointer;
    /*background-color:#F2F2F2;*/
    border: none;
    border-radius: 25%;
    background-color: rgba(255, 0, 0, 0.48);
  }
`

const bodyTexts = {
  contact: `Please send any comments, questions, or concerns to Tnemeh@oberlin.edu`,
  about: `ObieLocal is a web service made by Oberlin students to help other students 
    find events on campus. ObieLocal is currently being developed by Colton Potter, 
    Minh Lam, Lukas Griffin, and Thomas Nemeh for their CSCI 241 final project.`,
  use: `Click on a pin and information for an event will be displayed.`
};

const titles = {
  contact: `Contact`,
  about: `About`,
  use: `Use`
}

class Popup extends React.Component {

  handleClick = (e) => {
    const navbar = document.getElementById("navbar");
    if (this.node.contains(e.target) || navbar.contains(e.target)) {
      return;
    } else {
      this.props.handleClose(e);
    }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  
  render() {
    const title = titles[this.props.type];
    const body = bodyTexts[this.props.type];

    return (
      <StyledPopup>
        <div className='popup' ref={node => this.node = node}>
          <button onClick={this.props.handleClose} id = "x">
              X
          </button>
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
      </StyledPopup>
    );
  }
}

export default Popup;