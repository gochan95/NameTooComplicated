import React, { Component } from 'react';
import Login from './components/Login';
import Landing from './Landing';
// import Avatar from './components/Avatar';
import ControlPanelStore from './stores/ControlPanelStore';

import { observer } from 'mobx-react';

import './styles/App2.css';
import './styles/Animation.css';

@observer
export default class App2 extends Component {
  exploreClick = () => {
    this.props.AuthStore.toggleForm(true);
  };

  renderLogin = () => {
    return (
      <div className="login">
        <Login AuthStore={this.props.AuthStore} />
      </div>
    );
  };

  render() {
    const { openLogin } = this.props.AuthStore;
    return (
      <div className="main-container">
        <div className="title-bar-container">
          <div className="title-bar-logo" />
          <div className="title-bar-buttons" />
        </div>
        <div className="landing-container">
          {!openLogin && (
            <p className="explore-button" onClick={this.exploreClick}>
              Explore
            </p>
          )}
          {openLogin && this.renderLogin()}
          <div className="footer-container">
            <p className="footer-text border-right">The drawsquad © 2018</p>
            <p className="footer-text border-right">Credits</p>
            <p className="footer-text">Authors</p>
            <div className="avatar-icon" id="roy" />
            <div className="avatar-icon" id="gordan" />
            <div className="avatar-icon" id="kevin" />
          </div>
        </div>
      </div>
    );
  }
}
