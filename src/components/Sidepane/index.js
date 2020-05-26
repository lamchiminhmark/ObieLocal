import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from './Tabs';
import '../../styles/tabs.css';
import SidepaneCloseButton from './SidepaneCloseButton';
import AgendaEventList from './AgendaEventList';
import { StyledPane, StyledPaneBody } from './styles';
import EventDetails from './EventDetails';
import { toggleSidepane } from '../../actions/sidepaneActions';

class Sidepane extends Component {
  render() {
    return (
      <StyledPane
        className={this.props.active ? 'Sidepane-active' : 'Sidepane-inactive'}
        id="sidepane"
      >
        <StyledPaneBody>
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
        </StyledPaneBody>
        <SidepaneCloseButton
          id="sidepane-close"
          onClick={this.props.closeSidepane}
        />
      </StyledPane>
    );
  }
}

const mapStateToProps = ({ sidepane, markers }) => {
  const { selectedEventsArray, activeEventIdx: eventIdx } = markers;
  const { sidepaneOpen: active } = sidepane;
  return { active, selectedEventsArray, eventIdx };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSidepane: () => dispatch(toggleSidepane({ close: true }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidepane);
