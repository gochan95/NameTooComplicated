import * as THREE from 'three';
import * as objLoader from 'three-obj-loader';
var OrbitControls = require('three-orbit-controls')(THREE);

// var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 1000 / 400, 0.1, 1000);
camera.position.z = 100;
var threeRender = new THREE.WebGLRenderer({ antialias: true });
var loader = new THREE.TextureLoader();
loader.setCrossOrigin('');
threeRender.setPixelRatio(window.devicePixelRatio);
var orbitControls = new OrbitControls(camera);
objLoader(THREE);
var objectLoader = new THREE.ObjectLoader();
export { camera, threeRender, objectLoader, orbitControls };
