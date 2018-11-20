import React, { Children } from "react";
import styled from 'styled-components';

const StyledNav = styled.div`
    background-color: rgba(255, 0, 0, 0.6);
    position: fixed;
    top: 0px;

    ul {
        /* display: inline-block; */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        list-style-type: none;
        /* background-color:  */
        padding: 0px;
        margin: 0px; 
        /* width: 100%; */
    }

    li {
        /* display: inline; */
        padding: 15px 1px;
    }

    a {
        padding: 10px;
        border: 3px solid black;
        background-color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        color: black;
    }

    a:hover {
        background-color: rgba(200, 200, 200, 0.9);
    }
    
`

class NavBar extends React.Component {

    render() {
        return(
            <StyledNav className="NavBar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">How to Use</a></li>
                </ul>
            </StyledNav>
        );
    }
}

export default NavBar;
