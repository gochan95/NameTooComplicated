// packages import
import React from 'react';
// import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import buildSceneFunctions from './BuildScene';
export default class Sphere extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 1,
      y: 1,
      z: 1
    };
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    var map = new THREE.TextureLoader().load('./textures/brickwall_normal.jpg');
    map.wrapS = THREE.RepeatWrapping;
    // map.anisotropy = 50;

    buildSceneFunctions.onWindowResize();
    document.body.appendChild(buildSceneFunctions.renderer.domElement);

    var geometry = new THREE.SphereGeometry(3, 50, 50);
    var material = new THREE.MeshNormalMaterial({ normalMap: map });
    var sphere = new THREE.Mesh(geometry, material);

    buildSceneFunctions.addObject(sphere);

    this.mount.appendChild(buildSceneFunctions.renderer.domElement);
  }

  render() {
    return (
      <div
        style={{ width: '1000px', height: '400px' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
