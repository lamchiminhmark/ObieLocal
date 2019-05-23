import React from 'react';
import styled from 'styled-components';
import constants from './constants';
import dateTime from 'node-datetime';

// 6 hours in minutes
const LATEST_POSSIBLE = 360;

const getColorFromStartTime = minutes => {
  minutes = minutes > 0 ? Math.abs(minutes) : 0;
  let bAmount = minutes / LATEST_POSSIBLE;
  bAmount = bAmount > 1 ? 1 : bAmount;
  let rGAmount = 1 - bAmount;


//   if (bAmount > 0.5) {
//     bAmount = (bAmount - 0.5) * 2;
//     const rGAmount = 1 - bAmount;
//     return `rgb(${255 - (255 - 205) * rGAmount}, ${150 - (150 - 16) * rGAmount}, ${150 -
//       (150 - 45) * rGAmount})`;
//   } else {
//       bAmount = bAmount * 2
//       const rGAmount = 1 - bAmount;
//       return `rgb(${205 - (205 - 150) * rGAmount}, ${16 - (16 - 0) * rGAmount}, ${45 +
//         (80 - 45) * rGAmount})`;
//   }

  return `hsl(0, ${75}%, ${75 - rGAmount * 50}%)`;
  //   return `rgb(80, 0, 80)`;
};

const getMinutesUntilStart = eventObj => {
  const now = new Date();
  const startTime = new Date(eventObj.start_time);
  const hoursUntilStart =
    (startTime.getTime() - now.getTime()) / constants.HOUR_TO_MILLISECONDS;
  return hoursUntilStart * 60;
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

  /* Set clock number font*/
  font-family: 'Barlow Condensed', sans-serif;
  color: whitesmoke;

  .marker-text {
    /* width: 100%;
    height: 100%;
    text-align: center;
    position: relative; */
  }

  /* TODO(ML): Refactorise <p> in tabs.css to remove the class */
  .numbers {
    /* left: 5%;
    top: 33%; */
    font-size: 14px;
    /* position: absolute; */
  }

  .am-pm {
    font-size: 9px;
    left: 41%;
    bottom: 0px;
    position: absolute;
  }
  /* The rotating semicircle in the animation. */
`;
//   ::before {
//     content: ' ';
//     display: block;
//     padding: 0px;
//     margin-left: 50%;
//     height: 99%;
//     border-radius: 0 100% 100% 0 / 50%;
//     background-color: #f7f7f7;
//     transform-origin: left;
//     transform: rotate(0);
//     overflow: hidden;

//     /* Each marker represents 6 hours, so the animation reflects that. */
//     animation-name: spin, ${props => props.animationName};
//     animation-duration: 10800s, 21600s;
//     animation-timing-function: linear, step-end;
//     animation-iteration-count: infinite;
//     animation-play-state: paused;
//     animation-delay: inherit;
//   }
// `;

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
    const minutesUntilStart = getMinutesUntilStart(this.props.eventArray[0]);
    // console.log(minutesUntilStart);
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
    const firstEvent = this.props.eventArray[0];
    // const verified = firstEvent.verified;
    let startTime = firstEvent.start_time
      ? dateTime.create(new Date(firstEvent.start_time), 'I:M').format()
      : '??';
    if (startTime.startsWith(0)) startTime = '  ' + startTime.substring(1);
    const amOrPm = firstEvent.start_time
      ? dateTime.create(new Date(firstEvent.start_time), 'p').format()
      : '??';
    const minutesUntilStart = getMinutesUntilStart(firstEvent);
    return (
      <MarkerWrap
        blink={this.displayData.blink}
        opacity={this.displayData.opacity}
      >
        <Button
          //   className={verified ? 'Marker-verified' : 'Marker-unverified'}
          onClick={() => this.props.handleMarkerClick(this.props.eventArray)}
          //   animationName={this.displayData.animationName}
          //   animationDelay={this.displayData.animationDelay}
          minutesUntilStart={minutesUntilStart}
        >
          {/* <div className='marker-text'>
            <div className="numbers">{startTime}</div>
            <p className="am-pm"> {amOrPm.substring(0, 1)}</p>
          </div> */}
          <div className="marker-text">
            <p className="numbers">
              {startTime}
              <span style={{ 'font-size': '10px' }}>
                {amOrPm.substring(0, 1)}
              </span>
            </p>
          </div>
        </Button>
      </MarkerWrap>
    );
  }
}

export default Marker;
