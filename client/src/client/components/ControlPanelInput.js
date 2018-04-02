import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../styles/ControlPanelInput.css';

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
    //pass the data to the actual gui changing
    var prop = this.props.property;
    if (prop === 'radius') {
    }
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
          placeholder={this.props.placeholder}
          type="number"
        />
      </div>
    );
  }
}
