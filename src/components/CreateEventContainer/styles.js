import styled from 'styled-components';

export const StyledPlusButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  background: rgba(255, 100, 100, 0.6);
  color: black;
  position: fixed;
  bottom: 40px;
  right: 40px;
  font-size: 20px;
  cursor: pointer;

  :hover {
    background: linear-gradient(
      180deg,
      rgba(210, 50, 50, 0.6) 0%,
      rgba(165, 25, 25, 0.6) 100%
    );
  }
  :focus {
    outline: 0;
  }
`;

export const StyledCreateEventPane = styled.form`
  margin: 0px;
  padding: 0px;
  top: 60px;
  width: 80%;
  min-width: 90vw;
  height: 80vh;
  background-color: rgba(255, 0, 0, 0.6);
  border: 3px solid white;
  border-right: 12px solid rgb(75, 75, 75);
  border-radius: 0px;
  border-style: inset;
  transition: all 1s;

  h1 {
    text-decoration: solid black underline;
    padding: 20px 0px;
    background-color: rgba(255, 184, 29, 0.7);
  }

  p {
    overflow: clip;
  }
  em {
    font-weight: bold;
  }

  #x {
    position: relative;
    float: right;
    color: #dc143c;
    width: 6.5%;
    height: 10%;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  label {
    display: block;
    margin: auto;
    text-align: left;
  }

  input,
  textarea {
    width: 100%;
  }

  td {
    text-align: right;
  }

  table {
    margin: auto;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 30px;
    box-shadow: 0px 0px 50px 40px rgba(255, 255, 255, 0.2);
    border-radius: 25px;
  }

  #submit {
    margin: 20px 0px;
    padding: 10px;
    padding: 6px 73px;
    position: relative;
    width: auto;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.9);
    border-radius: 40px;
    cursor: pointer;
  }

  #submit:hover {
    background-color: rgba(40, 40, 40, 0.5);
  }

  #warning-text {
    text-align: center;
    color: whitesmoke;
  }
`;
