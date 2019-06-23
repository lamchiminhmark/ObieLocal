import React from 'react';
import { connect } from 'react-redux';
import { toggleSidepane } from '../../actions/sidepaneActions';
import styled from 'styled-components';

const Div = styled.div`
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

const SidepaneCloseButton = props => {
  return (
    <Div>
      <button onClick={props.toggleSidepane}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </button>
    </Div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidepane: args => dispatch(toggleSidepane(args)),
  }
}

export default connect(undefined, mapDispatchToProps)(SidepaneCloseButton);
