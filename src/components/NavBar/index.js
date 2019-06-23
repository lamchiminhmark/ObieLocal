import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidepane } from '../../actions/sidepaneActions';
import Popup from './Popup';
import styled from 'styled-components';
import MenuButton from './MenuButton';

const Container = styled.div`
  width: 100%;
  border: 5px red;
`;

const StyledNav = styled.div`
  background: #222222;
  position: fixed;
  top: 0px;
  z-index: 1;
  width: 100%;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.27);

  h2 {
    color: whitesmoke;
    font-family: 'Varela Round', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  ul {
    font-family: 'Varela Round', sans-serif;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0px;
    margin: auto;
    float: right;
  }

  li {
    padding: 0;
  }

  button {
    color: white;
    padding: 1vh 15px;
    border: none;
    /*border-top: none;
    border-bottom: none;
    border-right: 1px solid whitesmoke;
    border-left: 1px solid whitesmoke;*/
    background-color: rgba(255, 255, 255, 0);
    text-decoration: none;
    box-shadow: none;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Varela Round', sans-serif;
  }

  button:hover {
    /* background-color: rgba(255, 255, 255, 0.2); */
    color: #cedd0e;
    /*border-bottom: 2px solid #cedd0e;*/
    box-shadow: 0px 2px #cedd0e;
  }

  @media only screen and (max-width: 475px) {
    h2 {
      left: 95px;
    }

    button {
      padding: 1vh 7px;
    }
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
      <Container id="interface">
        <StyledNav id="navbar">
          <MenuButton handleMenuClick={this.props.toggleSidepane} />
          <h2>ObieLocal</h2>
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
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSidepane: () => dispatch(toggleSidepane())
  }
}

export default connect(undefined, mapDispatchToProps)(NavBar);
