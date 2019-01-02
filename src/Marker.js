import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 0px;
  border-radius: 50%;
  color: rgb(255, 184, 29);
  animation-delay: ${props => props.animationDelay};
  border: 3px solid #ffb81d;

  /* The rotating semicircle in the animation. */
  ::before {
    content: ' ';
    display: block;
    padding: 0px;
    margin-left: 50%;
    height: 99%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: #4f0611;
    transform-origin: left;
    transform: rotate(0);
    overflow: hidden;

    /* Each marker represents 6 hours, so the animation reflects that. */
    animation: spin 10800s linear infinite,
      ${props => props.backgroundAnimation} 21600s step-end infinite;
    animation-play-state: paused;
    animation-delay: inherit;
  }
`;

class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.getFillAmount = this.getFillAmount.bind(this);
  }

  /**
   * Determines the amount of the marker that should be filled up, based on the
   * event's start time. Note that since the animation is hardcoded to last for
   * 6 hours (the max time of each marker), this function returns the correct
   * number of seconds as CSS to begin and pause the animation in the right
   * place. There should be no markers rendered with a start time that has
   * already passed, but the check remains for safety.
   */
  getFillAmount() {
    const minutesUntilStart = this.props.hoursUntilStart * 60;
    if (minutesUntilStart > 360 || minutesUntilStart < 0) {
      return '0';
    } else {
      const deg = 360 - minutesUntilStart;
      const sec = deg * 60;
      return `-${sec}s`;
    }
  }

  render() {
    const verified = this.props.eventInfo.verified;
    const backgroundAnimation = verified ? 'bg-verified' : 'bg-unverified';
    return (
      <Button
        className={verified ? 'Marker-verified' : 'Marker-unverified'}
        onClick={() => this.props.handleMarkerClick(this.props.eventInfo)}
        backgroundAnimation={backgroundAnimation}
        animationDelay={this.getFillAmount}
      />
    );
  }
}

export default Marker;
