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
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      phiStart: 0,
      phiLength: 6.3,
      thetaStart: 6,
      thetaLength: 6.3
    };
    if (props.radius) this.state.radius = props.radius;
    if (props.widthSegments) this.state.height = props.widthSegments;
    if (props.heightSegments) this.state.heightSegments = props.heightSegments;
    if (props.phiStart) this.state.phiStart = props.phiStart;
    if (props.phiLength) this.state.phiLength = props.phiLength;
    if (props.thetaStart) this.state.thetaStart = props.thetaStart;
    if (props.thetaLength) this.state.thetaLength = props.thetaLength;
  }
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    var map = new THREE.TextureLoader().load('./textures/brickwall_normal.jpg');
    map.wrapS = THREE.RepeatWrapping;
    // map.anisotropy = 50;

    buildSceneFunctions.onWindowResize();
    // document.body.appendChild(buildSceneFunctions.renderer.domElement);

    var geometry = new THREE.SphereGeometry(
      this.state.radius,
      this.state.widthSegments,
      this.state.heightSegments,
      this.state.phiStart,
      this.state.phiLength,
      this.state.thetaStart,
      this.state.thetaLength
    );
    var material = new THREE.MeshNormalMaterial({ normalMap: map });
    var sphere = new THREE.Mesh(geometry, material);

    buildSceneFunctions.addObject(sphere);
    buildSceneFunctions.objects.push(sphere);
    this.mount.appendChild(buildSceneFunctions.renderer.domElement);
  }

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
