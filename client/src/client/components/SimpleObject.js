import React, { Component } from 'react';
import * as THREE from 'three';
import { threeRender } from '../constants/SceneConstants';
import '../styles/SimpleObject.css';

export default class SimpleObject extends Component {
  componentDidMount() {
    const { geometry, mesh, sphere, cube } = this.props;
    var objectGeometry;

    // if sphere, set sphere geometry to object var
    sphere &&
      (objectGeometry = new THREE.SphereGeometry(
        geometry.radius,
        geometry.widthSegments,
        geometry.heightSegments,
        geometry.phiStart,
        geometry.phiLength,
        geometry.thetaStart,
        geometry.thetaLength
      ));

    // if cube, set cube geometry to object var
    cube &&
      (objectGeometry = new THREE.BoxGeometry(
        geometry.width,
        geometry.height,
        geometry.depth
      ));

    // new object using above given geometry
    var object = new THREE.Mesh(objectGeometry, mesh);

    this.props.SceneStore.addObject(object);
    // buildSceneFunctions.objects.push(sphere);
    this.mount.appendChild(threeRender.domElement);
    // this.animate();
  }

  render() {
    return (
      <div
        onMouseOver={() => {
          this.props.SceneStore.enableOrbitDragControls();
        }}
        className="object-container"
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
