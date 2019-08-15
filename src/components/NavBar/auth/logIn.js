import React, { Component } from 'react';
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

class LogIn extends Component {
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
          <h4>Already have an account?</h4> 
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
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
}

const mapStateToProps = ({auth}) => {
  return {
    err: auth.err,
  }
}
export default connect(mapStateToProps)(LogIn);
