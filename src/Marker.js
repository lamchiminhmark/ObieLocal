import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: rgb(255, 184, 29);
    background-color: #cf102d;
    opacity: 0.8;
    padding: 14px;
    //* / fontWeight: bolder;
    // fontFamily: Arial;
    // fontSize: 10pt;
    // textAlign: center; */
    border:2pt solid #ffb81d;
    cursor: pointer;

`

const Marker = props => {
    return (
        <Button className={props.eventInfo.verified === 1 ? 'Marker-verified' : 'Marker-unverified'} onClick={() => props.handleMarkerClick(props.eventInfo)}></Button>
        // <Wrapper/>
    )
}

export default Marker;
