import React, { Component } from 'react';

import '../styles/UnderlineButton.css';

export default class UnderlineButton extends Component {
  onClick = () => {
    this.props.onClick && this.props.onClick();
  };

  renderUnderLineButton = () => {
    var className = 'underline-button-container';
    if (this.props.active) {
      className = 'underline-button-container underline-button-active';
    }
    return (
      <div className={className} onClick={this.onClick}>
        <p className="underline-button-text">{this.props.text}</p>
      </div>
    );
  };

  render() {
    return this.renderUnderLineButton();
  }
}
