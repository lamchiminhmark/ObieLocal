import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useFirebase } from 'react-redux-firebase';

const Wrapper = styled.div`
  display: inline-block;
  /*
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  */
`

// TODO(CP): If logging in and there is no profile found, create a profile.
const LogIn = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const firebase = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user: { uid, displayName, email } }) => {
        console.log(
          `Signed in user ${uid} with email ${email} and display name ${displayName}`
        );
      })
      .catch((error) => {
        console.log(
          `Login failed with error code ${error.code}: ${error.message}`
        );
      });
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
          {err ? <p>{err.message}</p> : undefined}
        </div>
      </form>
    </Wrapper>
  );
}

const mapStateToProps = ({ firebase }) => ({ err: firebase.authError || '' });

export default connect(mapStateToProps)(LogIn);

