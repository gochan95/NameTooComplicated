// packages import
import React from 'react';
// import React3 from 'react-three-renderer';
import * as THREE from 'three';
// import ReactDOM from 'react-dom';
import buildSceneFunctions from './BuildScene';

export default class Plane extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    var map = new THREE.TextureLoader().load('./textures/mou.jpg');

    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    buildSceneFunctions.onWindowResize();
    document.body.appendChild(buildSceneFunctions.renderer.domElement);

    var geometry = new THREE.PlaneGeometry(3, 50, 50);
    var material = new THREE.MeshBasicMaterial({ color: 'red' });
    console.log(material);
    var plane = new THREE.Mesh(geometry, material);

    buildSceneFunctions.scene.add(plane);

    // buildSceneFunctions.addObject(sphere);

    this.mount.appendChild(buildSceneFunctions.renderer.domElement);
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
