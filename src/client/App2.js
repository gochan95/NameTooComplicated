import React, { Component } from 'react';
import Login from './components/Login';
import Landing from './Landing';

import ControlPanelStore from './stores/ControlPanelStore';

import { observer } from 'mobx-react';

import './styles/App2.css';
import './styles/Animation.css';

@observer
export default class App2 extends Component {
  exploreClick = () => {
    this.props.AuthStore.toggleForm(true);
  };

  signout = () => {
    this.props.AuthStore.setUsername(null);
  }

  renderLogin = () => {
    return (
      <div
        className="login"
        onMouseOver={this.props.SceneStore.disableOrbitDragControls}>
        <Login AuthStore={this.props.AuthStore}/>
      </div>
    );
  };

  render() {
    const { openLogin, username } = this.props.AuthStore;
    return (
      <div className="main-container">
        <div className="title-bar-container">
          <div className="title-bar-logo" />
          {username && (
            <div className="title-bar-buttons" onClick={this.signout}>
              logout
            </div>
          )}
        </div>
        <div className="landing-container">
          {!username && (!openLogin && (
            <p className="explore-button" onClick={this.exploreClick}>
              Explore
            </p>
          ))}
          {openLogin && this.renderLogin()}
          {username && <Landing
            SceneStore={this.props.SceneStore}
            AuthStore={this.props.AuthStore}
            ControlPanelStore={ControlPanelStore}
          />}
          {!username &&
            (
            <div className="footer-container">
              <p className="footer-text border-right">The drawsquad © 2018</p>
              <p className="footer-text border-right">Credits</p>
              <p className="footer-text">Authors</p>
              <div className="avatar-icon" id="roy" />
              <div className="avatar-icon" id="gordan" />
              <div className="avatar-icon" id="kevin" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
