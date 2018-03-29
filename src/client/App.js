// packages import
import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './Landing';
// files import
import './styles/App.css';
import { observer } from 'mobx-react';

@observer
export default class App extends Component {
  toggleForm = set => {
    this.props.AuthStore.toggleForm(set);
  };

  renderLoginForm() {
    // const store = this.props.store;

    return (
      <div className="loginForm">
        <div
          id="close"
          onClick={() => {
            this.toggleForm(false);
            this.props.SceneStore.getDragControls.enabled = true;
            this.props.SceneStore.getOrbitControls.enabled = true;
          }}
        />
        <Login />
      </div>
    );
  }

  render() {
    // const store = this.props.store;
    return (
      <div className="main-container">
        <div className="title-bar">
          <div className="title-bar-text">Draw.Squad</div>
          <div className="buttons-container">
            <div
              className="profile-container"
              onClick={() => {
                console.log('clicked profile container to open login form');
                console.log(this.props.SceneStore.getDragControls);
                console.log(this.props.SceneStore.getOrbitControls);
                this.props.SceneStore.getDragControls.enabled = false;
                this.props.SceneStore.getOrbitControls.enabled = false;
                console.log(this.props.SceneStore.getDragControls);
                console.log(this.props.SceneStore.getOrbitControls);
                this.toggleForm(true);
              }}
            >
              <div className="profile-name">
                {this.props.AuthStore.usersName || 'login'}
              </div>
              <div id="profile-icon" />
            </div>
          </div>
        </div>
        {this.props.AuthStore.closeForm ? this.renderLoginForm() : <div />}
        {/* {console.log(this.props.AuthStore)} */}
        <Landing
          SceneStore={this.props.SceneStore}
          AuthStore={this.props.AuthStore}
        />
      </div>
    );
  }
}
