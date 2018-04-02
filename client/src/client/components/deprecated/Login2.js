import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import '../styles/Login.css';
import AuthStore from '../stores/AuthStore';

export default observer(
  class Login2 extends Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        email: '',
        password: ''
      });
    }

    handleInputChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      this[name] = value;
    };

    handleSubmit = e => {
      e.preventDefault();
      const { email, password } = this;
    };

    render() {
      const { email, password } = this;

      return (
        <div className="login-container">
          <div className="sign-up-google margin">
            <div id="my-signin2" />
          </div>
          <div className="or-form margin">
            <div className="seperator" />
            or
            <div className="seperator" />
          </div>
          <form id="form" onSubmit={this.handleSubmit} name="signin">
            <input
              id="email"
              className="margin"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange}
            />
            <input
              className="margin"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
            />
            <button type="submit" value="submit" name="action">
              Sign-in
            </button>
          </form>
          <div className="seperator large-margin" />
          <div className="bottom mid-margin">
            <div>Don't have a Squad Account?</div>
            <div className="bottom-text">Sign up</div>
          </div>
        </div>
      );
    }
  }
);
