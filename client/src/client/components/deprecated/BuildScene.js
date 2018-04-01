// import React3 from 'react-three-renderer';
import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
// import OrbitControls from 'three-orbit-controls';
var OrbitControls = require('three-orbit-controls')(THREE);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 1000 / 400, 0.1, 1000);
var objects = [];
var renderer = new THREE.WebGLRenderer({ antialias: true });
camera.position.z = 100;
var orbitControls = new OrbitControls(camera);
const dragControls = new DragControls(objects, camera, renderer.domElement);
dragControls.addEventListener('dragstart', function(event) {
  orbitControls.enabled = false;
});
dragControls.addEventListener('dragend', function(event) {
  orbitControls.enabled = true;
});
console.log(objects);
animate();
function render() {
  scene.traverse(function(object) {
    if (object.isMesh === true) {
      object.rotation.x += 0.01;
      object.rotation.y += 0.01;
      object.rotation.z += 0.01;
      object.position.z -= 0.01;
      object.scale.set(1, 2, 1);
    }
  });
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  // stats.update();
}
function addObject(object) {
  scene.add(object);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
export default { scene, camera, renderer, addObject, onWindowResize, objects };
