/* Container */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidepane } from '../../actions/sidepaneActions';
import Popup from './Popup';
import MenuButton from './MenuButton';
import { StyledNavContainer, StyledNav } from './styles';

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
      <StyledNavContainer id="interface">
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
      </StyledNavContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSidepane: () => dispatch(toggleSidepane())
  }
}

export default connect(undefined, mapDispatchToProps)(NavBar);
