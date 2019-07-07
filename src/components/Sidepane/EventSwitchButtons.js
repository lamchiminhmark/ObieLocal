/* Presentational components */

import React from 'react';
import styled from 'styled-components';

const PREV = 'PREV';
const NEXT = 'NEXT';

const Wrapper = styled.div`
  position: relative;
  width: var(--pane-min-width);
  button {
    position: relative;
    margin: auto;
    width: 80px;
    height: 23px;
    border: none;
    font-weight: bolder;
    transition: background-color 0.3s ease, opacity 0.2s ease,
      box-shadow 0.2s ease;
  }
`;

const PrevButton = styled.button`
  left: 0;
  margin-left: 16%;
  background-color: ${props => props.bgColor};
  box-shadow: ${props => props.boxShadow};
  opacity: ${props => props.opacity};
  cursor: ${props => props.cursor};
  :hover {
    background-color: ${props => props.bgHighlight};
  }
`;

const EventNumber = styled.span`
  padding: 20px;
`;

const NextButton = styled.button`
  right: 0;
  margin-right: 16%;
  background-color: ${props => props.bgColor};
  box-shadow: ${props => props.boxShadow};
  opacity: ${props => props.opacity};
  cursor: ${props => props.cursor};
  :hover {
    background-color: ${props => props.bgHighlight};
  }
`;

/**
 * Determines whether there are multiple events at the current location and
 * creates buttons to switch through them if necessary.
 * @returns {JSX.Element} A div with 0 or 2 styled buttons.
 */
// TODO(CP): Make this code cleaner

const EventSwitchButtons = props => {
  const { eventIdx, totalEvents, handleEventSwitch } = props;
  const prevExists = eventIdx > 0;
  const nextExists = eventIdx < totalEvents - 1;
  if (!nextExists && !prevExists) return null;

  const LIGHT_GREEN = '#cedd0e';
  const LIGHT_GREEN_HL = '#dceb0f';
  const LIGHT_GRAY = '#d7d7d7';
  const BOX_SHADOW = '0 2px 3px rgb(0, 0, 0, 0.50)';

  const prevProps = {
    onClick: prevExists ? handleEventSwitch(PREV) : null,
    bgColor: prevExists ? LIGHT_GREEN : LIGHT_GRAY,
    bgHighlight: prevExists ? LIGHT_GREEN_HL : null,
    cursor: prevExists ? 'pointer' : 'default',
    boxShadow: prevExists ? BOX_SHADOW : 'none',
    opacity: prevExists ? '1' : '0.5'
  };

  const nextProps = {
    onClick: nextExists ? handleEventSwitch(NEXT) : null,
    bgColor: nextExists ? LIGHT_GREEN : LIGHT_GRAY,
    bgHighlight: nextExists ? LIGHT_GREEN_HL : null,
    cursor: nextExists ? 'pointer' : 'default',
    boxShadow: nextExists ? BOX_SHADOW : 'none',
    opacity: nextExists ? '1' : '0.5'
  };

  return (
    <Wrapper id="multi-event-buttons">
      <PrevButton id="button-prev-event" {...prevProps}>
        {`<<`}
      </PrevButton>
      <EventNumber>
        {eventIdx + 1}/{totalEvents}
      </EventNumber>
      <NextButton id={'button-next-event'} {...nextProps}>
        >>
      </NextButton>
    </Wrapper>
  );
};

export default EventSwitchButtons;
