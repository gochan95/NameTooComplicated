import React, { Component } from 'react';
import SceneStore from '../stores/SceneStore';
import '../styles/SquareButton.css';
import CONTROL_OBJECT from '../constants/createGuiData.js';
export default class SquareButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: this.props.on || false
    };
  }

  onClick = () => {
    // active icon button
    this.props.off || this.setState({ on: !this.state.on });
    var scene = SceneStore.scene;
    if (this.props['close']) {
      var name = this.props.object.name;
      var object;
      for (var i = scene.children.length - 1; i >= 0; i--) {
        object = scene.children[i];
        if (object.name === name) {
          CONTROL_OBJECT.removeFolder(name);
          scene.remove(object);
        }
      }
    }
    this.props.onClick && this.props.onClick();
  };

  renderIconButton = iconName => {
    var icon = this.props[iconName];
    return (
      icon &&
      (this.state.on ? (
        <div className="square-button-icon" id={`${iconName}-blue-icon`} />
      ) : (
        <div className="square-button-icon" id={`${iconName}-icon`} />
      ))
    );
  };

  renderText = text => {
    // console.log(this.state.on,text)
    return this.state.on ? (
      <p className="square-button-text blue-text">{text}</p>
    ) : (
      <p className="square-button-text">{text}</p>
    );
  };

  renderStayCoolIcon = name => {
    var icon = this.props[name];
    return icon && <div className="square-button-icon" id={`${name}-icon`} />;
  };

  render() {
    return (
      <div
        className="square-button-container small-padding"
        onClick={this.onClick}
      >
        {this.renderIconButton('info')}
        {this.renderIconButton('rockandroll')}
        {this.renderText(this.props.text)}
        {this.renderIconButton('add')}
        {this.renderStayCoolIcon('close')}
      </div>
    );
  }
}
