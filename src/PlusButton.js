import React, { Component } from "react";
import styled from 'styled-components';

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: red;
  color: yellow;
  position: fixed;
  top: 525px;
  left: 1250px;
  font-weight: 900;
  font-size: 20px;

  :hover {
    /* background: rgb(255,100,100); */
    background: linear-gradient(
      180deg,
      rgba(210, 50, 50, 0.6) 0%,
      rgba(165, 25, 25, 0.6) 100%
    );
  }
  

`

class PlusButton extends Component {
    handleClick(e) {
      alert("You can't create an event yet!");
    }
  
    render() {
      return (
          <div>
        <Button onClick={() => props.handleMarkerClick(props.eventInfo)}>+
        </Button>
        </div>
      );
    }
  }

export default PlusButton;