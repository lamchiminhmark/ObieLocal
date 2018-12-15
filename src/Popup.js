import React from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div`
  .popup {
  position: fixed;
  width: 80%;
  height: 80%;
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

  componentWillMount() {
    document.addEventListener('mousedown', this.props.handleClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.props.handleClose, false);
  }
  
  render() {
    const title = titles[this.props.type];
    const body = bodyTexts[this.props.type];

    return (
      <StyledPopup>
        <div className='popup'>
          <div className='popup_inner'>
          <button onClick={this.props.handleClose} id = "x">
              X
          </button>
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
        </div>
      </StyledPopup>
    );
  }
}

export default Popup;