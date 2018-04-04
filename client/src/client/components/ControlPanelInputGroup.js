import React, { Component } from 'react';
import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';
import ControlPanelInput from './ControlPanelInput';
import ControlPanelLayer from './ControlPanelLayer';
import { observer } from 'mobx-react';
import Shapes from '../constants/Shapes';

import '../styles/ControlPanelInputGroup.css';
import '../styles/Animation.css';

@observer
export default class ControlPanelInputGroup extends Component {
  renderShapeInput = () => {
    var object = this.props.ControlPanelStore.getSelectedObject;
    var shape;
    if (object.geometry) {
      shape = Shapes.mapShapes[object.geometry.type];
    } else {
      shape = object.shape;
    }

    return (
      <div
        className="fadeInRight"
        onMouseOver={this.props.SceneStore.disableOrbitDragControls}
      >
        {Shapes[shape].map(i => (
          <ControlPanelInput
            object={object}
            key={`${i}`}
            property={`${i}`}
            SceneStore={this.props.SceneStore}
            ControlPanelStore={this.props.ControlPanelStore}
          />
        ))}
      </div>
    );
  };

  renderLayerInput = name => {
    return (
      <div className="render-layer-input fadeInRight">
        <div className="layer-name">{name}</div>
        <div className="layer-scroll">
          <ControlPanelLayer />
          <ControlPanelLayer />
        </div>
      </div>
    );
  };

  layerClick = () => {
    this.props.ControlPanelStore &&
      this.props.ControlPanelStore.toggleLayerProperties();
  };

  propertyClick = () => {
    this.props.ControlPanelStore &&
      this.props.ControlPanelStore.toggleObjectProperties();
  };

  closeClick = () => {
    this.props.ControlPanelStore &&
      this.props.ControlPanelStore.closeControlPanel();
  };

  getCurrentObject = () => {
    if (this.props.ControlPanelStore) {
      return this.props.ControlPanelStore.getSelectedObject;
    }
  };

  getCurrentObjectShape = () => {
    if (this.props.ControlPanelStore) {
      var object = this.props.ControlPanelStore.getSelectedObject;
      var shape;
      if (object.geometry) {
        shape = Shapes.mapShapes[object.geometry.type];
      } else {
        shape = object.shape;
      }
      return shape;
    }
  };

  render() {
    const { objectProperties, layerProperties } = this.props.ControlPanelStore;
    return (
      <div>
        <div className="top-right fadeInRight">
          <SimpleObjectButton
            raised
            object={`${this.getCurrentObjectShape()}`}
          />
          {objectProperties && (
            <SquareButton
              on
              text={`${this.getCurrentObject().name}`}
              onClick={this.propertyClick}
            />
          )}
          {!objectProperties && (
            <SquareButton
              text={`${this.getCurrentObject().name}`}
              onClick={this.propertyClick}
            />
          )}
          <SquareButton close onClick={this.closeClick} />
        </div>
        <div className="top-right-drop-down fadeInDown">
          {objectProperties && this.renderShapeInput()}
          {layerProperties && this.renderLayerInput('layer name')}
        </div>
      </div>
    );
  }
}
