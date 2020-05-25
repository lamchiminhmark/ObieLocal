import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';

const SignUp = (props) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firebase = getFirebase();
    const { firstName, lastName, email, password } = formState;
    firebase
      .createUser(
        { email, password },
        {
          email,
          firstName,
          lastName,
          initials: firstName[0] + lastName[0],
        }
      )
      .then((user) => console.log(user))
      .catch((err) => console.error(`ERROR: Account Creation\n ${err.message}`));
  };
  // if (loggedIn) return <Redirect to="/" />;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten z-depth-0">Sign Up</button>
        </div>
        <div className="red-text">
          {props.err ? <p>{props.err.message}</p> : undefined}
        </div>
      </form>
    </div>
  );
};

// TODO(CP): Deal with access to error messages
const mapStateToProps = ({ firebase }) => {
  return {
    err: firebase.authError || '',
  };
};

export default connect(mapStateToProps)(SignUp);
