import React, { Component } from 'react';
import * as THREE from 'three';
import { threeRender } from '../constants/SceneConstants';

export default class SimpleObject extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     geometry: null,
  //     material: null
  //   }
  // }

  addObject = object => {
    this.props.store.addObject(object);
  };

  componentDidMount() {
    //setting magical width and height, haha
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    console.log(this.mount);

    const { geometry, mesh, sphere, cube } = this.props;
    var objectGeometry;

    // var SphereGeometry = new THREE.SphereGeometry(
    //     geometry.radius,
    //     geometry.widthSegments,
    //     geometry.phiStart,
    //     geometry.phiLength,
    //     geometry.thetaStart,
    //     geometry.thetaLength
    // ));
    sphere &&
      (objectGeometry = new THREE.SphereGeometry(
        geometry.radius,
        geometry.widthSegments,
        geometry.phiStart,
        geometry.phiLength,
        geometry.thetaStart,
        geometry.thetaLength
      ));

    cube &&
      (objectGeometry = new THREE.BoxGeometry(
        geometry.width,
        geometry.height,
        geometry.depth
      ));

    // (cube &&
    //   objectGeometry = new THREE.BoxGeometry(
    //     geometry.width,
    //     geometry.height,
    //     geometry.depth
    //   ));

    var object = new THREE.Mesh(objectGeometry, mesh);

    this.addObject(object);
    // buildSceneFunctions.objects.push(sphere);
    this.mount.appendChild(threeRender.domElement);
  }

  render() {
    return (
      <div
        className="sphere-container"
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
