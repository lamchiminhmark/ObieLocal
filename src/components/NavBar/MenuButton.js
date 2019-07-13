import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { StyledHamburgerButton } from './styles';
library.add(faBars);

const MenuButton = props => (
  <StyledHamburgerButton onClick={props.handleMenuClick}>
    <FontAwesomeIcon id="hamburger-icon" icon="bars" size="1x" />
  </StyledHamburgerButton>
);

export default MenuButton;
