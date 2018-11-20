import React from 'react';
import styled from 'styled-components';
// import Wrapper from './MarkerStyle'

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
`

const Marker = props => {
    return (
        <Button></Button>
        // <Wrapper/>
    )
}

export default Marker;