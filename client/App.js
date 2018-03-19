// packages import
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './Landing';
// files import
 import './styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: false
    };
  }

  openLoginForm() {
    this.setState({
      loginForm: true
    });
  }

  closeLoginForm() {
    this.setState({
      loginForm: false
    });
  }

  renderLoginForm() {
    return (
      <div className="loginForm">
        <div id="close" onClick={this.closeLoginForm.bind(this)} />
        <Login />
      </div>
    );
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <div className="title-bar">
            <div className="title-bar-text">Draw.Squad</div>
            <div className="buttons-container">
              <div
                className="profile-container"
                onClick={this.openLoginForm.bind(this)}
              >
                <div className="profile-name">login</div>
                <div id="profile-icon" />
              </div>
            </div>
          </div>
          {this.state.loginForm ? this.renderLoginForm() : <div />}
          <Route exact path="/" component={Landing} />
        </div>
      </Router>
    );
  }
}
