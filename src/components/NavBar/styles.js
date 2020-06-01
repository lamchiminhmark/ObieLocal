import styled from 'styled-components';

export const StyledNav = styled.div`
  background: #222222;
  position: fixed;
  top: 0px;
  z-index: 1;
  width: 100%;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.27);

  h2 {
    color: whitesmoke;
    font-family: 'Varela Round', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  ul {
    font-family: 'Varela Round', sans-serif;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0px;
    margin: auto;
    float: right;
  }

  li {
    padding: 0;
  }

  button {
    color: white;
    padding: 1vh 15px;
    border: none;
    /*border-top: none;
  border-bottom: none;
  border-right: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;*/
    background-color: rgba(255, 255, 255, 0);
    text-decoration: none;
    box-shadow: none;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Varela Round', sans-serif;
  }

  button:hover {
    /* background-color: rgba(255, 255, 255, 0.2); */
    color: #cedd0e;
    /*border-bottom: 2px solid #cedd0e;*/
    box-shadow: 0px 2px #cedd0e;
  }

  @media only screen and (max-width: 475px) {
    h2 {
      left: 95px;
    }

    button {
      padding: 1vh 7px;
    }
  }
`;

export const StyledNavContainer = styled.div`
  width: 100%;
  border: 5px red;
`;

export const StyledHamburgerButton = styled.button`
  outline: none;
  border: none;
  display: inline;
  /* position: fixed;
left: 0px;
top: 37px; */
  box-shadow: 0px 0px 6px #000000dd;
  padding: 40px;
  position: absolute;
  left: 0px;
  margin: 0px 5px;

  :active {
    background-color: #ffffff22;
  }
`;

export const StyledPopup = styled.div`
  .popup {
    position: fixed;
    width: 60%;
    height: 60%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    color: rgba(255, 255, 255, 0.8);
    background: linear-gradient(
      rgba(55, 55, 55, 0.95),
      rgba(30, 30, 30, 0.95) 65%
    );
    border: 2px solid rgba(35, 35, 35, 0.7);
    border-radius: 14px;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.27);
    overflow: auto;
  }

  h1 {
    background-color: #cedd0e;
    color: black;
    border-radius: 14px;
    font-family: 'Varela Round', sans-serif;
  }

  #x {
    position: relative;
    float: right;
    color: #ffffff;
    width: 42px;
    height: 42px;
    cursor: pointer;
    border: none;
    border-radius: 20%;
    background-color: rgb(166, 38, 38);
    text-align: center;
  }

  p {
    padding: 20px 20px 10px 10px;
  }
`;
