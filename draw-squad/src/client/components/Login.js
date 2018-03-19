import React, {
  Component
} from 'react';
// var axios = require('axios');
//styles
import axios from 'axios';
import '../styles/Login.css';

axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      enterPassword: "",
      confirmPassword: "",
      justPassword: "",
      form: true,
      signed: false
    }
  }

  handleJustPassword(e) {
    this.setState({
      justPassword: e.target.value
    });
  }

  handleEmailInput(e) {
    console.log(e)
    this.setState({
      email: e.target.value
    });
  }

  handleEnterInput(e) {
    this.setState({
      enterPassword: e.target.value
    });
  }

  handleConfirmInput(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleSignupSubmit(e) {
    e.preventDefault();

    if (this.state.enterPassword === this.state.confirmPassword) {
      console.log('signup');
      var params = new URLSearchParams();
      params.append('username', this.state.email);
      params.append('password', this.state.confirmPassword);
      axios.post('/signup', params)
        .then(function(response) {
          console.log(response)
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

  handleSigninSubmit(e) {
    e.preventDefault();
    console.log('signin');

    var params = new URLSearchParams();
    params.append('username', this.state.email);
    params.append('password', this.state.justPassword);
    axios.post('/signin', params)
      .then(function(response) {
        console.log(response)
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  toggleForm(){
    this.setState({
      form: !this.state.form
    });
  }

   renderSignup(){
    return (
      <div className="login-container">
        <div className="sign-up-google margin">
          <div id="my-signin2"></div>
        </div>
        <div className="or-form margin">
          <div className="seperator"/>
          or
          <div className="seperator"/>
        </div>
        <form onSubmit={this.handleSignupSubmit.bind(this)}>
          <input
            id="email"
            className="margin"
            name="sign-up-email"
            type="text"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={this.handleEmailInput.bind(this)}>
          </input>
          <input
            className="margin"
            name="enter-password"
            type="password"
            placeholder="Enter Password"
            required
            minLength="6"
            value={this.state.enterPassword}
            onChange={this.handleEnterInput.bind(this)}>
          </input>
          <input
            className="margin"
            name="confirm-password"
            type="password"
            placeholder="Confirm Password"
            required
            minLength="6"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmInput.bind(this)}>
          </input>
          <button type="submit" value="submit">
            Sign-up
          </button>
        </form>
        <div className="seperator large-margin"/>
        <div className="bottom mid-margin">
          <div>Already have a Squad Account?</div>
          <div className="bottom-text" onClick={this.toggleForm.bind(this)}>Log in</div>
        </div>
      </div>
    );
  }

  renderSignin() {
    return (
      <div className="login-container">
        <div className="sign-up-google margin">
          <div id="my-signin2"></div>
        </div>
        <div className="or-form margin">
          <div className="seperator"/>
          or
          <div className="seperator"/>
        </div>
        <form onSubmit={this.handleSigninSubmit.bind(this)}>
          <input
            id="email"
            className="margin"
            name="sign-in-email"
            type="text"
            placeholder="Email"

            value={this.state.email}
            onChange={this.handleEmailInput.bind(this)}>
          </input>
          <input
            className="margin"
            name="just-password"
            type="password"
            placeholder="Password"

            value={this.state.justPassword}
            onChange={this.handleJustPassword.bind(this)}>
          </input>
          <button type="submit" value="submit">
            Sign-in
          </button>
        </form>
        <div className="seperator large-margin"/>
        <div className="bottom mid-margin">
          <div>Don't have a Squad Account?</div>
          <div className="bottom-text" onClick={this.toggleForm.bind(this)}>Sign up</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.form
          ?
          this.renderSignin()
          :
          this.renderSignup()}
      </div>
    );
  }
}
//<div className="g-signin2" data-onsuccess="onSignIn"></div>
