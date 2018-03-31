import React, { Component } from 'react';

import '../styles/SceneObjectItem.css';
import '../styles/Shapes.css';
import dat from 'dat.gui';
import * as THREE from 'three';
export default class SceneObjectItem extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: this.props.value || ''
    // };
  }
  renderShapeIcon = () => {
    const { object } = this.props;
    return (
      <div className="scene-object-item-icon" id={`shape-${object.shape}`} />
    );
  };

  onClick = () => {
    const { object } = this.props;
    // this.props.ControlPanelStore &&
    //   this.props.ControlPanelStore.openControlPanel(object);
    var objectName = object.name;
    this.props.SceneStore.getScene.traverse(function(object) {
      var data = {
        radius: 5,
        widthSegments: 32,
        heightSegments: 32,
        phiStart: 0,
        phiLength: 6.3,
        thetaStart: 0,
        thetaLength: 6.3
      };
      if (object.name === objectName) {
        var gui = new dat.GUI();
        var folder = gui.addFolder(object.name);
        folder
          .add(data, 'radius', 1, 30)
          .step(1)
          .onChange(generateGeometry);
        folder
          .add(data, 'widthSegments', 3, 32)
          .step(1)
          .onChange(generateGeometry);
        folder
          .add(data, 'heightSegments', 2, 32)
          .step(1)
          .onChange(generateGeometry);
        folder.add(data, 'phiStart', 0, 8).onChange(generateGeometry);
        folder.add(data, 'phiLength', 0, 6.3).onChange(generateGeometry);
        folder.add(data, 'thetaStart', 0, 8).onChange(generateGeometry);
        folder.add(data, 'thetaLength', 0, 6.3).onChange(generateGeometry);
      }
      function updateGroupGeometry(mesh, geometry) {
        mesh.geometry.dispose();
        mesh.geometry = geometry;
      }
      function generateGeometry() {
        updateGroupGeometry(
          object,
          new THREE.SphereGeometry(
            data.radius,
            data.widthSegments,
            data.heightSegments,
            data.phiStart,
            data.phiLength,
            data.thetaStart,
            data.thetaLength
          )
        );
      }
    });
  };

  render() {
    return (
      <div
        onClick={this.onClick}
        className="scene-object-item-container medium-padding padding-right"
      >
        {this.renderShapeIcon()}
        <div className="padding-left scene-object-item-name">
          {this.props.object.name}
        </div>
      </div>
    );
  }
}
