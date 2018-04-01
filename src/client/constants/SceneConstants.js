import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
var OrbitControls = require('three-orbit-controls')(THREE);

var scene = new THREE.Scene();
var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);
var camera = new THREE.PerspectiveCamera(50, 1000 / 400, 0.1, 1000);
var threeRender = new THREE.WebGLRenderer({ antialias: true });
var loader = new THREE.TextureLoader();
loader.setCrossOrigin('');
threeRender.setPixelRatio(window.devicePixelRatio);

camera.position.z = 100;

var orbitControls = new OrbitControls(camera);
// orbitControls.enableZoom = false;
const dragControls = new DragControls(
  scene.children,
  camera,
  threeRender.domElement
);

export { scene, camera, threeRender, orbitControls, dragControls, loader };
