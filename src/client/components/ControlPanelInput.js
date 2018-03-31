import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../styles/ControlPanelInput.css';
import dat from 'dat.gui';

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
    var objectName = this.props.ControlPanelStore.getSelectedObject.name;

    this.props.SceneStore.getScene.traverse(function(object) {
      if (object.isMesh === true && object.name === objectName) {
        // object.scale.x = e.target.value * 0.1;
        // object.scale.y = e.target.value * 0.1;
        // object.scale.z = e.target.value * 0.1;
        // .heightSegments=32;

        // object.updateMatrix();
        console.log(object);
      }
    });

    console.log(e.target.value);
    console.log('current object is ' + this.props.SceneStore);
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
