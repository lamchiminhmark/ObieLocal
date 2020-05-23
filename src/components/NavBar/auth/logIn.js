import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../../actions/authActions';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  /*
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  */
`

const LogIn = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(signIn({email, password}));
  };

  const { err } = props;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h4>Already have an account?</h4> 
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-field">
          <button>Log In</button>
        </div>
        <div className="red-text">
          {err ? <p>Log in failed</p> : undefined}
        </div>
      </form>
    </Wrapper>
  );
}

const mapStateToProps = ({auth}) => {
  return {
    err: auth.err,
  }
}

export default connect(mapStateToProps)(LogIn);
