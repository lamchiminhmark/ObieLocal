import React from 'react';
// import Wrapper from './MarkerStyle'

const style = {
width: '28px',
heigth: '28px',
borderRadius: '50%',
color: 'yellow',
padding: '14px',
// fontWeight: 'bolder',
// fontFamily: 'Arial',
// fontSize: '10pt',
// textAlign: 'center',
border: '2pt solid blue',
}

const Marker = props => {
    return (
        <button style={style}></button>
        // <Wrapper/>
    )
}

export default Marker;