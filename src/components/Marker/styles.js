import styled from 'styled-components';

export const StyledMarkerButton = styled.button`
  width: 35px;
  height: 35px;
  padding: 0px;
  border-radius: 50%;
  border-width: 0.5px;
  box-shadow: 1px 1px 5px 1px #4e4e4e;
  background-color: ${props => props.backgroundColor};
  animation-delay: ${props => props.animationDelay};
  font-family: 'Barlow Condensed', sans-serif;
  color: whitesmoke;

  /* TODO(ML): Refactorise <p> in tabs.css to remove the class */
  .numbers {
    font-size: 14px;
  }

  .am-pm {
    font-size: 9px;
    left: 41%;
    bottom: 0px;
    position: absolute;
  }
`;

export const StyledMarkerWrap = styled.div`
  opacity: ${props => props.opacity};
  animation-name: ${props => (props.blink ? 'marker-blink' : '')};
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;
