import styled from 'styled-components';

export const StyledSeeMoreButton = styled.button`
  outline: none;
  border: none;
  padding: 10px 10px;
  right: 0px;
  margin: 5px;
  background-color: #cedd0e;
  color: #555;
  font-weight: bold;
  font-family: 'Varela Round', sans-serif;

  :hover {
    background-color: #303030;
    color: #ededed;
  }
`;

export const StyledPane = styled.div`
  margin: 0px;
  padding: 0px;
  top: 0px;
  width: 90%;
  --pane-max-width: 450px;
  max-width: var(--pane-max-width);
  height: 100%;
  position: fixed;
  transition: all 1s;
  z-index: 2;

  p:not(:last-child) {
    margin: 0 0 20px;
  }
`;

export const StyledPaneBody = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin: 0px;
  padding: 0px;
  overflow: hidden auto;
  background-color: hsla(0, 0%, 96%, 1);
  border-radius: 0px;
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.27);
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;

  .event-details {
    margin: 0px;
  }
  h1 {
    background-color: #cedd0e;
    margin: 0px;
    padding: 5px 5px;
  }
  p {
    overflow: clip;
    padding: 15px;
    cursor: default;
  }
  em {
    font-weight: bold;
  }
  /* // TODO(ML): remove this to see if img size is correct */
  .event-img {
    max-width: 95%;
    margin: auto;
  }
`;

export const EventSwitchButtons = styled.div`
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

export const PrevButton = styled.button`
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

export const NextButton = styled.button`
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

export const EventNumber = styled.span`
  padding: 20px;
`;

export const StyledCloseDiv = styled.div`
  position: absolute;
  top: 0px;
  left: 100%;
  width: 25px;
  height: 69px;
  background-color: white;
  border: 1px solid rgb(0, 0, 0, 0.2);

  button {
    outline: none;
    background-color: hsla(0, 0%, 96%, 1);
    border: 0;
    height: 100%;
    width: 100%;
  }
`;
