import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../styles/ControlPanelInput.css';
import * as THREE from 'three';
@observer
export default class ControlPanelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div className="control-panel-input-container small-padding">
        <div className="control-panel-input-name padding-right">
          {this.props.property}
        </div>
        <input
          onChange={this.handleChange}
          value={this.state.value}
          type="number"
        />
      </div>
    );
  }
}
