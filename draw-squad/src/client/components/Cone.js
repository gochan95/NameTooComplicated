// packages import
import React from 'react';
// import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import buildSceneFunctions from './BuildScene';

export default class Cone extends React.Component {
  constructor(props) {
    super(props);

    // this.start = this.start.bind(this);
    // this.stop = this.stop.bind(this);
    // this.animate = this.animate.bind(this);
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

    var geometry = new THREE.ConeGeometry(3, 5, 43, 12, false, 0, 6.3);
    var material = new THREE.MeshNormalMaterial({ normalMap: map });
    var cone = new THREE.Mesh(geometry, material);
    buildSceneFunctions.addObject(cone);
    // this.addObject(cone);
    // geometry = new THREE.SphereGeometry(3, 50, 50);
    // material = new THREE.MeshNormalMaterial({normalMap:map});
    // var S = new THREE.Mesh(geometry, material);
    // scene.add(S);

    // buildSceneFunctions.camera.position.z = 10;

    // this.scene = scene;
    // this.camera = camera;
    // this.renderer = renderer;
    // this.material = material;
    this.cone = cone;

    this.mount.appendChild(buildSceneFunctions.renderer.domElement);
    // this.renderScene();
    // this.start();
  }

  // componentWillUnmount() {
  //   this.stop();
  //   this.mount.removeChild(this.renderer.domElement);
  // }

  // start() {
  //   if (!this.frameId) {
  //     this.frameId = requestAnimationFrame(this.animate);
  //   }
  // }

  // stop() {
  //   cancelAnimationFrame(this.frameId);
  // }

  // animate() {

  //   this.cone.rotation.y += 0.01;
  //   this.cone.rotation.x += 0.01;

  //   this.renderScene();
  //   this.frameId = window.requestAnimationFrame(this.animate);
  // }

  // renderScene() {
  //   this.renderer.render(buildSceneFunctions.scene, buildSceneFunctions.camera);
  // }

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
