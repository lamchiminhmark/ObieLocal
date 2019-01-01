import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 40px; height: 40px;
    padding: 0px;
    border-radius: 50%;
    color: rgb(255, 184, 29);
    opacity: ${props => props.opacity};
    animation-delay: -65s;
    border: 3px solid #ffb81d;
    cursor: pointer;

    ::before {
      content: ' ';
      display: block;
      padding: 0px;
      margin-left: 50%;
      height:100%;
      border-radius: 0 100% 100% 0 / 50%;
      background-color: slategray;
      transform-origin: left;
      transform: rotate(0);
      animation: 
        spin 50s linear infinite, 
        ${props => props.backgroundAnimation} 100s step-end infinite;
      /* animation-play-state: paused; */
      animation-delay: inherit;
      overflow: hidden;
    }
`;

class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.getOpacity = this.getOpacity.bind(this);
  }

  getOpacity() {
    const hoursUntilStart = this.props.hoursUntilStart;
    return (10 - hoursUntilStart) / 10;
  }

  render() {
    const verified = this.props.eventInfo.verified;
    const backgroundAnimation = verified ? 'bg-verified' : 'bg-unverified';
    return (
      <Button
        className={verified ? 'Marker-verified' : 'Marker-unverified'}
        onClick={() => this.props.handleMarkerClick(this.props.eventInfo)}
        opacity={this.getOpacity}
        backgroundAnimation={backgroundAnimation}
      />
    );
  }
}

export default Marker;
