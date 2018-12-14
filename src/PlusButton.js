import React, { Component } from "react";
import styled from 'styled-components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
library.add(faUser);

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  
  background: rgba(255, 100, 100, 0.6);
  color: black;
  position: fixed;
  top: 525px;
  left: 1250px;
  font-size: 20px;
  

  :hover {
    /* background: rgb(255,100,100); */
    background: linear-gradient(
      180deg,
      rgba(210, 50, 50, 0.6) 0%,
      rgba(165, 25, 25, 0.6) 100%
    );
  }
  :focus {outline:0;}
  

`

class PlusButton extends Component {
    handleClick(e) {
      alert("You can't create an event yet!");
    }
  
    render() {
      return (
          <div>
        <Button onClick={() => this.props.toggleCreateEventContainer()}>+
        </Button>
        </div>
      );
    }
  }

export default PlusButton;