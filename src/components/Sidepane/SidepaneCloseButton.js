import React from 'react';
import { StyledCloseDiv } from './styles';

const SidepaneCloseButton = props => {
  return (
    <StyledCloseDiv>
      <button onClick={props.onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </button>
    </StyledCloseDiv>
  );
};

export default SidepaneCloseButton;
