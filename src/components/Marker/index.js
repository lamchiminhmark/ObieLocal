import React from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { setSelectedEvents } from '../../actions/eventActions';
import constants from '../../shared/constants';
import dateTime from 'node-datetime';
import { StyledMarkerButton, StyledMarkerWrap } from './styles';

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

  // TODO: Documentation
  handleMarkerClick = eventArray => {
    // Update google analytics about user click
    ReactGA.event({
      category: 'User',
      action: 'Marker Click'
    });
    this.props.setSelectedEvents(eventArray);
  };

  render() {
    const backgroundColor = getColorFromStartTime(
      this.displayData.minutesUntilStart
    );
    return (
      <StyledMarkerWrap
        blink={this.displayData.blink}
        opacity={this.displayData.opacity}
      >
        <StyledMarkerButton
          onClick={() => this.handleMarkerClick(this.props.eventArray)}
          minutesUntilStart={this.displayData.minutesUntilStart}
          backgroundColor={backgroundColor}
        >
          <div className="marker-text">
            <p className="numbers">
              {this.displayData.time}
              <span style={{ fontSize: '10px' }}>
                {this.displayData.amOrPm.substring(0, 1)}
              </span>
            </p>
          </div>
        </StyledMarkerButton>
      </StyledMarkerWrap>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedEvents: activeEventArray =>
    dispatch(setSelectedEvents(activeEventArray))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Marker);
