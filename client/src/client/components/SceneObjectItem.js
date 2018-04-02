import React, { Component } from 'react';
import '../styles/SceneObjectItem.css';
import '../styles/Shapes.css';
import * as THREE from 'three';
import {
  create_sphere_gui,
  create_cube_gui,
  create_cone_gui,
  create_cylinder_gui,
  create_tet_gui,
  create_ico_gui,
  create_oct_gui,
  gui,
  removeFolder,
  gui_container
} from '../constants/createGuiData.js';
import Shapes from '../constants/Shapes';

export default class SceneObjectItem extends Component {
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
    gui_container.style.visibility = 'visible';
    var objectName = object.name;

    this.props.SceneStore.getScene.traverse(function(object) {
      var curr_folder = Object.keys(gui.__folders);

      if (object.name === objectName && !curr_folder.includes(object.name)) {
        var update_func;
        var type = Object.getPrototypeOf(object.geometry);

        if (type === Object.getPrototypeOf(new THREE.SphereGeometry()))
          update_func = create_sphere_gui;

        if (type === Object.getPrototypeOf(new THREE.BoxGeometry()))
          update_func = create_cube_gui;

        if (type === Object.getPrototypeOf(new THREE.CylinderGeometry()))
          update_func = create_cylinder_gui;

        if (type === Object.getPrototypeOf(new THREE.ConeGeometry()))
          update_func = create_cone_gui;

        if (type === Object.getPrototypeOf(new THREE.OctahedronGeometry()))
          update_func = create_oct_gui;

        if (type === Object.getPrototypeOf(new THREE.IcosahedronGeometry()))
          update_func = create_ico_gui;

        if (type === Object.getPrototypeOf(new THREE.TetrahedronGeometry()))
          update_func = create_tet_gui;

        for (var folder in gui.__folders) {
          removeFolder(folder);
        }
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
