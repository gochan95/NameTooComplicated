import * as THREE from 'three';
// import DragControls from 'three-dragcontrols';
// var OrbitControls = require('three-orbit-controls')(THREE);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 1000 / 400, 0.1, 1000);
var threeRender = new THREE.WebGLRenderer({ antialias: true });
var loader = new THREE.TextureLoader();
loader.setCrossOrigin('');
threeRender.setPixelRatio(window.devicePixelRatio);

camera.position.z = 100;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  threeRender.setSize(window.innerWidth, window.innerHeight);
}

export { scene, camera, threeRender, onWindowResize, loader };
