import styled from 'styled-components';

export const StyledUserButton = styled.button`
  position: fixed;
  top: 8px;
  right: 40px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 20%;
  background: linear-gradient(
    180deg,
    rgba(255, 100, 100, 0.6) 0%,
    rgba(210, 50, 50, 0.6) 100%
  );
  cursor: pointer;

  #user-icon {
    padding: 10px;
  }

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
