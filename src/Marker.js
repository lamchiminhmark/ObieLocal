import React from 'react';
import styled from 'styled-components';
import constants from './constants';
import dateTime from 'node-datetime';

/** Upper bound on Marker coloring transition. */
const MINUTES_TO_COLOR_LIMIT = 360;

const getColorFromStartTime = minutes => {
  minutes = minutes > 0 ? Math.abs(minutes) : 0;
  let bValue = minutes / MINUTES_TO_COLOR_LIMIT;
  bValue = bValue > 1 ? 1 : bValue;
  let rgValue = 1 - bValue;
  return `hsl(0, ${75}%, ${75 - rgValue * 50}%)`;
};

const getMinutesUntilStart = eventObj => {
  const now = new Date();
  const startTime = new Date(eventObj.start_time);
  const hoursUntilStart =
    (startTime.getTime() - now.getTime()) / constants.HOUR_TO_MILLISECONDS;
  return Math.ceil((hoursUntilStart * 60) / 5) * 5; //round to the nearest multiple of 5
};

const Button = styled.button`
  width: 35px;
  height: 35px;
  padding: 0px;
  border-radius: 50%;
  border-width: 0.5px;
  box-shadow: 1px 1px 5px 1px #4e4e4e;
  background-color: ${props => getColorFromStartTime(props.minutesUntilStart)};
  animation-delay: ${props => props.animationDelay};
  font-family: 'Barlow Condensed', sans-serif;
  color: whitesmoke;

  /* TODO(ML): Refactorise <p> in tabs.css to remove the class */
  .numbers {
    font-size: 14px;
  }

  .am-pm {
    font-size: 9px;
    left: 41%;
    bottom: 0px;
    position: absolute;
  }
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
    const firstEvent = this.props.eventArray[0];
    const minutesUntilStart = getMinutesUntilStart(firstEvent);
    const startTime = this.getStartTime(firstEvent);
    const displayData = {
      opacity: 1.0,
      blink: 0,
      minutesUntilStart: minutesUntilStart,
      time: startTime.time,
      amOrPm: startTime.amOrPm
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

  getStartTime = firstEvent => {
    let startTime = firstEvent.start_time
      ? dateTime.create(new Date(firstEvent.start_time), 'I:M').format()
      : '??';
    if (startTime.startsWith(0)) startTime = '  ' + startTime.substring(1);
    const amOrPm = firstEvent.start_time
      ? dateTime.create(new Date(firstEvent.start_time), 'p').format()
      : '??';
    return { time: startTime, amOrPm: amOrPm };
  };

  render() {
    return (
      <MarkerWrap
        blink={this.displayData.blink}
        opacity={this.displayData.opacity}
      >
        <Button
          onClick={() => this.props.handleMarkerClick(this.props.eventArray)}
          minutesUntilStart={this.displayData.minutesUntilStart}
        >
          <div className="marker-text">
            <p className="numbers">
              {this.displayData.time}
              <span style={{ 'font-size': '10px' }}>
                {this.displayData.amOrPm.substring(0, 1)}
              </span>
            </p>
          </div>
        </Button>
      </MarkerWrap>
    );
  }
}

export default Marker;
