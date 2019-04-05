import React from 'react';
import styled from 'styled-components';
import constants from './constants';
import * as bobaLogo from './boba-logo.jpg';

const Button = styled.button`
  width: 35px;
  height: 35px;
  padding: 0px;
  border-radius: 50%;
  color: rgb(255, 184, 29);
  animation-delay: ${props => props.animationDelay};
  /* opacity: ${props => props.opacity}; */
  border: 3px solid #ffb81d;

  /* The rotating semicircle in the animation. */
  ::before {
    content: ' ';
    display: block;
    padding: 0px;
    margin-left: 50%;
    height: 99%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: #f7f7f7;
    transform-origin: left;
    transform: rotate(0);
    overflow: hidden;
    
    /* Each marker represents 6 hours, so the animation reflects that. */
    animation-name: spin, ${props => props.animationName};
    animation-duration: 10800s, 21600s;
    animation-timing-function: linear, step-end;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    animation-delay: inherit;
  }
`;

const Boba = styled.input`
  width: 35px;
  height: 35px;
  padding: 0px;
  border-radius: 50%;
  src: ${bobaLogo.default};
`;

const MarkerWrap = styled.div`
  opacity: ${props => props.opacity};
  animation-name: ${props => (props.blink ? 'marker-blink' : '')};
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.displayData = this.getDisplayData();
  }

  /**
   * Determines marker display information based on event timing.
   * @returns An object including display properties.
   */
  getDisplayData = () => {
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
        : 'bg-unverified',
      blink: 0
    };
    if (minutesUntilStart > 360) {
      displayData.animationDelay = '0s';
      displayData.opacity = 0.7;
    } else if (minutesUntilStart < 0) {
      displayData.animationDelay = '-21599s';
      displayData.blink = 1;
    } else {
      const deg = 360 - minutesUntilStart;
      const sec = deg * 60;
      displayData.animationDelay = `-${sec}s`;
    }
    return displayData;
  };

  render() {
    const {title, verified} = this.props.eventArray[0];
    return (
      <MarkerWrap
        blink={this.displayData.blink}
        opacity={this.displayData.opacity}
      >
       { title === "Ice Cream Social" ? <Boba
          type="image"
          src={bobaLogo.default}
          onClick={() => this.props.handleMarkerClick(this.props.eventArray)}
          aria-label="boba-logo"
        /> :
        <Button
          className={verified ? 'Marker-verified' : 'Marker-unverified'}
          onClick={() => this.props.handleMarkerClick(this.props.eventArray)}
          animationName={this.displayData.animationName}
          animationDelay={this.displayData.animationDelay}
        />}
      </MarkerWrap>
    );
  }
}

export default Marker;
