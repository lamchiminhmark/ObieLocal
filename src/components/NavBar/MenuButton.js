import React from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
library.add(faBars);

const Button = styled.button`
  outline: none;
  border: none;
  display: inline;
  /* position: fixed;
  left: 0px;
  top: 37px; */
  box-shadow: 0px 0px 6px #000000dd;
  padding: 40px;
  position: absolute;
  left: 0px;
  margin: 0px 5px;

  :active {
    background-color: #ffffff22;
  }
`;

const MenuButton = props => (
      <Button onClick={props.handleMenuClick}>
        <FontAwesomeIcon id="hamburger-icon" icon="bars" size="1x" />
      </Button>
    );

export default MenuButton;
