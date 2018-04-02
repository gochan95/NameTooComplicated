import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Login from './components/Login';
import Landing from './Landing';

import { objectLoader } from './constants/SceneConstants';

import './styles/App.css';
import './styles/Animation.css';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userHasCanvas: false
    };
  }

  componentWillMount() {
    axios.get('/checklogin').then(
      res => {
        this.props.AuthStore.setUsername(res.data.user);
        this.pullUsersScenes(res.data.user);
      },
      err => {}
    );
  }

  pullUsersScenes = user => {
    axios.get(`/scenes/names/${user}`).then(
      res => {
        if (res.data.length > 0) {
          this.setState({ userHasCanvas: true });
          res.data.forEach(canvas => {
            this.props.SceneStore.addScene(canvas.name);
          });
          axios
            .get(`/scenes/${user}/${this.props.SceneStore.currentScene}`)
            .then(res => {
              objectLoader.parse(JSON.parse(res.data.scene), result => {
                this.props.SceneStore.loadCanvas(result);
              });
            });
        }
      },
      err => {
        console.log(err);
      }
    );
  };
  exploreClick = () => {
    this.props.AuthStore.toggleForm(true);
  };

  signout = () => {
    this.props.AuthStore.setUsername(null);
    this.props.SceneStore.resetSceneObservables();
    this.props.AuthStore.resetAuthObservables();
    this.props.ControlPanelStore.resetControlPanelObservables();
    this.setState({ value: '', userHasCanvas: false });
    axios.get('/signout').then(res => {});
  };

  renderLogin = () => {
    return (
      <div
        className="login"
        onMouseOver={() => {
          this.props.SceneStore.orbitControls.enabled = false;
        }}
      >
        <Login
          AuthStore={this.props.AuthStore}
          checkForScenes={this.pullUsersScenes.bind(this)}
        />
      </div>
    );
  };

  handleNewUserScene = e => {
    this.setState({ value: e.target.value });
  };

  handleNewUserSceneSubmit = e => {
    e.preventDefault();
    if (this.state.value !== '') {
      this.props.SceneStore.addScene(this.state.value);
      this.setState({
        value: '',
        userHasCanvas: true
      });
    }
  };

  renderUserLanding = () => {
    //need to check
    var userHasCanvas = this.state.userHasCanvas;

    if (!userHasCanvas) {
      return (
        <div
          className="new-user-input-scene"
          onMouseOver={() => {
            this.props.SceneStore.orbitControls.enabled = false;
          }}
        >
          <form onSubmit={this.handleNewUserSceneSubmit}>
            <input
              className="new-user-input"
              onChange={this.handleNewUserScene}
              value={this.state.value}
              placeholder="Enter a name for your first scene"
            />
          </form>
        </div>
      );
    } else {
      return (
        <Landing
          SceneStore={this.props.SceneStore}
          AuthStore={this.props.AuthStore}
          ControlPanelStore={this.props.ControlPanelStore}
        />
      );
    }
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
        <div className="app-container">
          {!username &&
            (!openLogin && (
              <p className="explore-button" onClick={this.exploreClick}>
                Explore
              </p>
            ))}
          {openLogin && this.renderLogin()}
          {username && this.renderUserLanding()}
          {!username && (
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
