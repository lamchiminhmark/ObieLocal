import React from 'react';
import styled from 'styled-components';
import constants from './../constants';

const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 0px;
  border-radius: 50%;
  color: rgb(255, 184, 29);
  animation-delay: ${props => props.animationDelay};
  opacity: ${props => props.opacity};
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
      ${props => props.animationName} 21600s step-end infinite;
    animation-play-state: paused;
    animation-delay: inherit;
  }
`;

class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.getDisplayData = this.getDisplayData.bind(this);
  }

  /**
   * Determines the amount of the marker that should be filled up, based on the
   * event's start time. Note that since the animation is hardcoded to last for
   * 6 hours (the max time of each marker), this function returns the correct
   * number of seconds as CSS to begin and pause the animation in the right
   * place. Any events that have already begun will be shown as full.
   */
  getDisplayData() {
    const now = new Date();
    const startTime = new Date(this.props.eventArray[0].start_time);
    const hoursUntilStart =
      (startTime.getTime() - now.getTime()) / constants.HOUR_TO_MILLISECONDS;
    const minutesUntilStart = hoursUntilStart * 60;
    const displayData = {
      animationDelay: '0s',
      opacity: 1.0,
      animationName: this.props.eventArray[0].verified
        ? 'bg-verified'
        : 'bg-unverified'
    };
    if (minutesUntilStart > 360) {
      displayData.animationDelay = '0s';
      displayData.opacity = 0.7;
    } else if (minutesUntilStart < 0) {
      displayData.animationDelay = '-21599s';
      displayData.opacity = 0.1;
    } else {
      const deg = 360 - minutesUntilStart;
      const sec = deg * 60;
      displayData.animationDelay = `-${sec}s`;
    }
    return displayData;
  }

  render() {
    const verified = this.props.eventArray[0].verified;
    const displayData = this.getDisplayData();
    return (
      <Button
        className={verified ? 'Marker-verified' : 'Marker-unverified'}
        onClick={() => this.props.handleMarkerClick(this.props.eventArray)}
        opacity={displayData.opacity}
        animationName={displayData.animationName}
        animationDelay={displayData.animationDelay}
      />
    );
  }
}

export default Marker;
