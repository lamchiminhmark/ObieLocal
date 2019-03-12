import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
`

class SignIn extends Component {
  state = {
    email: '',  
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(signIn(this.state));
  };

  render() {
    const { err } = this.props;

    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <h5>Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button>Sign In</button>
          </div>
          <div className="red-text">
            {err ? <p>Sign in failed</p> : undefined}
          </div>
        </form>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    err: auth.err,
  }
}
export default connect(mapStateToProps)(SignIn);
