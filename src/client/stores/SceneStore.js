import { observable, action, autorun, computed } from 'mobx';
import {
  scene,
  camera,
  threeRender,
  onWindowResize,
  dragControls,
  orbitControls
} from '../constants/SceneConstants';
// import DragControls from 'three-dragcontrols';
import * as THREE from 'three';
// var OrbitControls = require('three-orbit-controls')(THREE);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

class SceneStore {
  @observable scene = scene;
  @observable camera = camera;
  // @observable orbitControls = orbitControls;
  // @observable dragControls = dragControls;
  @observable sceneObjects = [];
  @observable addingObjectShape = null;
  @observable enterNameBox = false;
  @observable scenes = [];
  @observable currentScene = null;
  @observable isObject = false;

  constructor() {
    // Need to get scenes array based on ownership via username
    // Axios.get();
    autorun(() => console.log('SceneStore'));
    // var testOrbit = this.orbitControls;
    //use animate to animate moving the object and future rotation animation
    //KEVIN EXPLAIN THIS FURTHER PLZ
    this.animate();
    // allow camera and object movement for scene children
    //===========TO DO==========================
    // move orbit and drag controls to SceneConstants
    // and write mobx getters to use scene and camera inside SceneConstsnts
    //
    // dragControls.addEventListener('dragstart', function(event) {
    //   orbitControls.enabled = false;
    // });
    //
    // dragControls.addEventListener('dragend', function(event) {
    //   orbitControls.enabled = true;
    // });
    //
    // document.addEventListener('mousedown', this.onObjectClick, false);
  }

  @computed
  get getScene() {
    return this.scene;
  }

  @computed
  get getCamera() {
    return this.camera;
  }

  @computed
  get getDragControls() {
    return this.dragControls;
  }

  @computed
  get getOrbitControls() {
    return this.orbitControls;
  }
  // mobx function to add object to scene
  @action
  addObject = object => {
    this.scene.add(object);
    onWindowResize();
  };

  @action
  addObjectWithName = name => {
    this.sceneObjects.push({ name: name, shape: this.addingObjectShape });
    var material = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    var geo, object;
    if (this.addingObjectShape === 'sphere')
      geo = new THREE.SphereGeometry(10, 3, 2);
    if (this.addingObjectShape === 'cube') geo = new THREE.BoxGeometry(1, 1, 1);
    if (this.addingObjectShape === 'cylinder')
      geo = new THREE.CylinderGeometry(5, 5, 20, 32);
    if (this.addingObjectShape === 'cone')
      geo = new THREE.ConeGeometry(5, 20, 32);
    if (this.addingObjectShape === 'octahedron')
      geo = new THREE.OctahedronGeometry(5);
    if (this.addingObjectShape === 'icosahedron')
      geo = new THREE.IcosahedronGeometry(5);
    if (this.addingObjectShape === 'octahedron')
      geo = new THREE.OctahedronGeometry(5);
    if (this.addingObjectShape === 'tetrahedron')
      geo = new THREE.TetrahedronGeometry(5);

    if (geo) object = new THREE.Mesh(geo, material);
    if (object) {
      object.name = name;
      object.geometry.morphTargets = true;
      object.geometry.verticesNeedUpdate = true;
      object.geometry.elementsNeedUpdate = true;
      object.geometry.groupsNeedUpdate = true;
    }
    this.scene.add(object);

    this.addingObjectShape = null;
  };

  @action
  deleteObject = object => {
    var index = this.sceneObjects.indexOf(object);
    this.sceneObjects.splice(index, 1);
  };

  setObjectShapeTobeAdd = object => {
    this.addingObjectShape = object;
  };

  @action
  openNameBox = () => {
    this.enterNameBox = true;
  };

  @action
  closeNameBox = () => {
    this.enterNameBox = false;
  };

  setIsObject = bool => {
    this.isObject = bool;
  };

  @action
  addScene = scene => {
    this.currentScene = scene;
    this.scenes.push(scene);
  };

  @action
  switchScene = scene => {
    this.currentScene = scene;
  };

  // mobx function to render canvas with objects and potential animation
  @action
  renderCanvas = () => {
    // animation to spin object
    this.scene.traverse(function(object) {
      if (object.isMesh === true) {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        object.rotation.z += 0.01;
        object.position.z -= 0.01;
        // object.scale.set(1, 2, 1);
      }
    });
    raycaster.setFromCamera(mouse, camera);

    threeRender.render(this.scene, this.camera);
  };
  // function to animate movement and add future rotational animation
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderCanvas();
  };

  // clicked to return object
  @action
  onObjectClick = event => {
    console.log('checking object click');
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = event.clientY / window.innerHeight * 2 - 1;

    var intersects = raycaster.intersectObjects(this.scene.children);
    console.log('intersects');
    console.log(intersects);
    if (intersects.length > 0) {
      console.log('Hit @' + toString(intersects[0].point + '\n'));
      console.log(intersects[0]);
      return intersects[0];
    }
  };
}

const sceneStore = new SceneStore();
export default sceneStore;
