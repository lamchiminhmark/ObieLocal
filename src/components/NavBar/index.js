/* Container */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleSidepane } from '../../actions/sidepaneActions';
import Popup from './Popup';
import MenuButton from './MenuButton';
import { StyledNavContainer, StyledNav } from './styles';
import { useFirebase } from 'react-redux-firebase';

const NavBar = (props) => {
  const [show, setShow] = useState('none');

  const firebase = useFirebase();

  const signOut = () => {
    firebase.auth().signOut().then(console.log('Signed out!'))
  }

  const togglePopup = (e) => {
    const name = e.target.getAttribute('id');
    switch (name) {
      case 'aboutBtn':
        setShow('about');
        break;
      case 'contactBtn':
        setShow('contact');
        break;
      case 'useBtn':
        setShow('use');
        break;
      case 'signUp':
        setShow('signUp');
        break;
      default:
        setShow('none');
    }
  };

  let popupElement = null;
  if (show !== 'none') {
    popupElement = <Popup type={show} handleClose={togglePopup} />;
  }
  const { loggedIn } = props;
  let authButton;
  if (loggedIn) {
    authButton = (
      <button id="logOut" onClick={signOut}>
        Log Out
      </button>
    );
  } else {
    authButton = (
      <button id="signUp" onClick={togglePopup}>
        Sign Up
      </button>
    );
  }

  return (
    <StyledNavContainer id="interface">
      <StyledNav id="navbar">
        <MenuButton handleMenuClick={props.toggleSidepane} />
        <h2>ObieLocal</h2>
        <ul>
          <li key="1">
            <button id="aboutBtn" onClick={togglePopup}>
              About
            </button>
          </li>
          <li key="2">
            <button id="contactBtn" onClick={togglePopup}>
              Contact
            </button>
          </li>
          <li key="3">{authButton}</li>
        </ul>
        {popupElement}
      </StyledNav>
    </StyledNavContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidepane: () => dispatch(toggleSidepane()),
  };
};

const mapStateToProps = ({ firebase, auth }) => {
  return {
    loggedIn: firebase.auth.uid ? true : false,
    err: auth.err || '',
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
