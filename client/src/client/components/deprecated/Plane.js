// packages import
import React from 'react';
// import React3 from 'react-three-renderer';
import * as THREE from 'three';
// import ReactDOM from 'react-dom';
import buildSceneFunctions from './BuildScene';

export default class Plane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      height: 10,
      widthSegments: 10,
      heightSegments: 5
    };
    if (props.width) this.state.width = props.width;
    if (props.height) this.state.height = props.height;
    if (props.widthSegments) this.state.widthSegments = props.widthSegments;
    if (props.heightSegments) this.state.heightSegments = props.heightSegments;
  }

  componentDidMount() {
    // var map = new  THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/1024px-Crab_Nebula.jpg');
    // map.wrapS = map.wrapT = THREE.RepeatWrapping;

    buildSceneFunctions.onWindowResize();
    document.body.appendChild(buildSceneFunctions.renderer.domElement);

    var geometry = new THREE.PlaneGeometry(
      this.state.width,
      this.state.height,
      this.widthSegments,
      this.heightSegments
    );
    var material = new THREE.MeshBasicMaterial();

    var plane = new THREE.Mesh(geometry, material);
    console.log(plane);
    buildSceneFunctions.scene.add(plane);
    buildSceneFunctions.objects.push(plane);
    // buildSceneFunctions.addObject(sphere);

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
