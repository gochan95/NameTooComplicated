import React, {
  Component
} from 'react';

import '../styles/ControlPanelInput.css';

export default class ControlPanelInput extends Component {
  render() {
    return (
      <div className="control-panel-input-container small-padding">
        <div className="control-panel-input-name padding-right">
          {this.props.property}
        </div>
        <input className="padding-left"/>
      </div>
    );
  }
}
