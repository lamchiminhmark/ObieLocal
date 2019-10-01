import React, { Component } from 'react';
import { StyledPlusButton } from './styles';

class PlusButton extends Component {
  render() {
    return (
      <div>
        <StyledPlusButton
          onClick={() => {
            this.props.toggleCreateEventContainer(true);
            this.props.toggleSidepane({ close: true });
          }}
        >
          +
        </StyledPlusButton>
      </div>
    );
  }
}

export default PlusButton;
