import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: yellow;
    background-color: #ffff99;
    padding: 14px;
    //* / fontWeight: bolder;
    // fontFamily: Arial;
    // fontSize: 10pt;
    // textAlign: center; */
    border:2pt solid blue;
    cursor: pointer;
`

const Marker = props => {
    return (
        <Button onClick={() => props.handleMarkerClick(props.eventInfo)}></Button>
        // <Wrapper/>
    )
}

export default Marker;