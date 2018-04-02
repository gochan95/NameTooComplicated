import React, { Component } from 'react';
import OBJECTS from '../constants/Objects.js';
import '../styles/SceneObjectItem.css';
import '../styles/Shapes.css';
import * as THREE from 'three';
import CONTROL_OBJECT from '../constants/createGuiData.js';
import { scene } from '../constants/SceneConstants';
import Shapes from '../constants/Shapes';

export default class SceneObjectItem extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: this.props.value || ''
    // };
  }
  renderShapeIcon = () => {
    const { object } = this.props;
    var shape;
    if (object.geometry) {
      shape = Shapes.mapShapes[object.geometry.type];
    } else {
      shape = object.shape;
    }
    return <div className="scene-object-item-icon" id={`shape-${shape}`} />;
  };

  onClick = () => {
    const { object } = this.props;

    var objectName = object.name;

    this.props.SceneStore.getScene.traverse(function(object) {
      var curr_folder = Object.keys(CONTROL_OBJECT.gui.__folders);
      if (object.name === objectName && !curr_folder.includes(object.name)) {
        var update_func;
        var type = Object.getPrototypeOf(object.geometry);
        if (type === Object.getPrototypeOf(new THREE.SphereGeometry()))
          update_func = CONTROL_OBJECT.create_sphere_gui;
        if (type === Object.getPrototypeOf(new THREE.BoxGeometry()))
          update_func = CONTROL_OBJECT.create_cube_gui;
        if (type === Object.getPrototypeOf(new THREE.CylinderGeometry()))
          update_func = CONTROL_OBJECT.create_cylinder_gui;
        if (type === Object.getPrototypeOf(new THREE.ConeGeometry()))
          update_func = CONTROL_OBJECT.create_cone_gui;
        if (type === Object.getPrototypeOf(new THREE.OctahedronGeometry()))
          update_func = CONTROL_OBJECT.create_oct_gui;
        if (type === Object.getPrototypeOf(new THREE.IcosahedronGeometry()))
          update_func = CONTROL_OBJECT.create_ico_gui;
        if (type === Object.getPrototypeOf(new THREE.TetrahedronGeometry()))
          update_func = CONTROL_OBJECT.create_tet_gui;
        update_func(object);
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
