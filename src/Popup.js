import React from 'react';
import styled from 'styled-components';

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

  render() {
    const title = titles[this.props.type];
    const body = bodyTexts[this.props.type];

    return (
      <div className='popup'>
        <div className='popup_inner' ref={nodeInside => this.nodeInside = nodeInside}>
        <button onClick={this.props.handler} id = "x">
            X
        </button>
          <h1>{title}</h1>
          <p>{body}</p>
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

  handleClick(e) {
    if (this.nodeInside.contains(e.target)) {
      return;
    } else {
      this.props.closePopup();
    }
  }

}

export default Popup;