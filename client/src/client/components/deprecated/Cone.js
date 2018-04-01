// packages import
import React from 'react';
// import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import buildSceneFunctions from './BuildScene';

export default class Cone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radius: 4,
      height: 3,
      radialSegments: 8,
      heightSegments: 1,
      openEnded: props.openEnded,
      thetaStart: 0,
      thetaLength: 6.3
    };
    if (props.radius) this.state.radius = props.radius;
    if (props.height) this.state.height = props.height;
    if (props.radialSegments) this.state.radialSegments = props.radialSegments;
    if (props.heightSegments) this.state.heightSegments = props.heightSegments;
    if (props.thetaStart) this.state.thetaStart = props.thetaStart;
    if (props.thetaLength) this.state.thetaLength = props.thetaLength;
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    var map = new THREE.TextureLoader().load('./textures/brickwall_normal.jpg');
    map.wrapS = THREE.RepeatWrapping;
    map.anisotropy = 50;
    // var renderer = new THREE.WebGLRenderer();
    buildSceneFunctions.onWindowResize();
    // renderer.setSize(width, height);
    document.body.appendChild(buildSceneFunctions.renderer.domElement);

    var geometry = new THREE.ConeGeometry(
      this.state.radius,
      this.state.height,
      this.state.radialSegments,
      this.state.heightSegments,
      this.state.openEnded,
      this.state.thetaStart,
      this.state.thetaLength
    );
    var material = new THREE.MeshNormalMaterial({ normalMap: map });
    var cone = new THREE.Mesh(geometry, material);
    buildSceneFunctions.addObject(cone);
    buildSceneFunctions.objects.push(cone);
    this.cone = cone;

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
