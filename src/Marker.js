import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: rgb(255, 184, 29);
    background-color: #cf102d;
    /* background-color: ${props =>
      props.backgroundColor || 'rgb(255,255,255);'}; */
    opacity: ${props => props.opacity};
    padding: 14px;
    //* / fontWeight: bolder;
    // fontFamily: Arial;
    // fontSize: 10pt;
    // textAlign: center; */
    border:2pt solid #ffb81d;
    cursor: pointer;
`;

class Marker extends React.Component {
  constructor(props) {
    super(props);

    this.getOpacity = this.getOpacity.bind(this);
  }

  getOpacity() {
    const hoursUntilStart = this.props.hoursUntilStart;
    return (10 - hoursUntilStart) / 10;
  }

  render() {
    return (
      <Button
        className={
          this.props.eventInfo.verified === 1
            ? 'Marker-verified'
            : 'Marker-unverified'
        }
        onClick={() => this.props.handleMarkerClick(this.props.eventInfo)}
        opacity={this.getOpacity}
      />
    );
  }
}

export default Marker;
