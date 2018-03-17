import React, {
  Component
} from 'react';
//styles
import '../styles/Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      enterPassword: "",
      confirmPassword: "",

    }

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleEnterInput = this.handleEnterInput.bind(this);
    this.handleConfirmInput = this.handleConfirmInput.bind(this);
  }
  handleEmailInput(event) {
    console.log(event)
    this.setState({
      email: event.target.value
    });
  }

  handleEnterInput(event) {
    this.setState({
      enterPassword: event.target.value
    });
  }

  handleConfirmInput(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('submit');
  }

  render() {
    return (
      <div className="login-container">
        <div className="sign-up-google margin">
          <div>
            Sign up with
          </div>
          <div className="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
        <div className="or-form margin">
          <div className="seperator"/>
          or
          <div className="seperator"/>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="margin"
            name="sign-up-email"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailInput}>
          </input>
          <input
            className="margin"
            name="enter-password"
            type="password"
            placeholder="Enter Password"
            value={this.state.enterPassword}
            onChange={this.handleEnterInput}>
          </input>
          <input
            className="margin"
            name="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmInput}>
          </input>
          <button type="submit" value="submit">
            Sign-up
          </button>
        </form>
      </div>
    );
  }
}
