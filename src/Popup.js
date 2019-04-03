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
    color: rgba(255, 255, 255, 0.8);
    background: linear-gradient(
      rgba(85, 55, 55, 0.95),
      rgba(30, 30, 30, 0.95) 65%
    );
    border: 5px solid rgba(35, 35, 35, 0.7);
    border-radius: 14px;
  }

  h1 {
    background-color: rgba(255, 184, 29, 0.7);
    color: black;
  }

  #x {
    position: relative;
    float: right;
    color: #ffffff;
    width: 45px;
    height: 45px;
    cursor: pointer;
    border: none;
    border-radius: 20%;
    background-color: rgb(166, 38, 38);
  }
`;

const bodyTexts = {
  contact: `Comments, questions, or suggestions for how we can make ObieLocal 
    better? Feel free to contact us by emailing Colton.Potter@oberlin.edu.`,
  about: `ObieLocal is a web service created by Oberlin students to help other 
    students find out what's happening on campus through a visual interface.
    The first version of ObieLocal was developed by Colton Potter, Minh Lam,
    Thomas Nemeh, and Lukas Griffin for their 'Systems Programming' final
    project. It continues to be developed by Colton, Minh, and Khang Nguyen.`
};

const titles = {
  contact: `Contact`,
  about: `About`
};

class Popup extends React.Component {
  handleClick = e => {
    const navbar = document.getElementById('navbar');
    if (this.node.contains(e.target) || navbar.contains(e.target)) {
      return;
    } else {
      this.props.handleClose(e);
    }
  };

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
        <div className="popup" ref={node => (this.node = node)}>
          <button onClick={this.props.handleClose} id="x">
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
