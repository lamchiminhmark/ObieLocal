import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Tabs from './Tabs';
import '../../styles/tabs.css';
import SidepaneCloseButton from './SidepaneCloseButton';
import AgendaEventList from './AgendaEventList';
import EventDetails from './EventDetails';

const StyledPane = styled.div`
  margin: 0px;
  padding: 0px;
  top: 0px;
  width: 90%;
  --pane-max-width: 450px;
  max-width: var(--pane-max-width);
  height: 100%;
  position: fixed;
  transition: all 1s;
  z-index: 2;

  p:not(:last-child) {
    margin: 0 0 20px;
  }
`;

const PaneBody = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin: 0px;
  padding: 0px;
  overflow: hidden auto;
  background-color: hsla(0, 0%, 96%, 1);
  border-radius: 0px;
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.27);
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;

  .event-details {
    margin: 0px;
  }
  h1 {
    background-color: #cedd0e;
    margin: 0px;
    padding: 5px 5px;
  }
  p {
    overflow: clip;
    padding: 15px;
    cursor: default;
  }
  em {
    font-weight: bold;
  }
  /* // TODO(ML): remove this to see if img size is correct */
  .event-img {
    max-width: 95%;
    margin: auto;
  }
`;

class Sidepane extends Component {
  render() {
    return (
      <StyledPane
        className={this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        id="sidepane"
      >
        <PaneBody>
          <Tabs>
            {/* Event Tab */}
            {/* If no event is selected  */}
            {this.props.selectedEventsArray[0].ID === 0 ? (
              <div label="Event">
                <p>Please select an event to view details</p>
              </div>
            ) : (
              <EventDetails label="Event" />
            )}
            {/* Agenda Tab */}
            <AgendaEventList label="Agenda" />
          </Tabs>
        </PaneBody>
        <SidepaneCloseButton id="sidepane-close" />
      </StyledPane>
    );
  }
}

const mapStateToProps = ({ sidepane, events }) => {
  const { selectedEventsArray, activeEventIdx: eventIdx } = events;
  const { sidepaneOpen: active } = sidepane;
  return { active, selectedEventsArray, eventIdx };
};

export default connect(mapStateToProps)(Sidepane);
