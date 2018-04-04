import { observable, action, computed } from 'mobx';
import {
  camera,
  threeRender,
  orbitControls
} from '../constants/SceneConstants';
import * as THREE from 'three';
import DragControls from 'three-dragcontrols';

class SceneStore {
  @observable scene = null;
  @observable camera = camera;
  @observable orbitControls = orbitControls;
  @observable dragControls = null;
  @observable sceneObjects = [];
  @observable addingObjectShape = null;
  @observable enterNameBox = false;
  @observable sceneNames = [];
  @observable currentScene = null;
  @observable isObject = false;
  @observable doAnimate = true;
  constructor() {
    window.addEventListener('resize', function() {
      threeRender.setSize(window.innerWidth, window.innerHeight, true);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }

  @action
  resetSceneObservables = () => {
    this.scene = null;
    this.camera = camera;
    this.orbitControls = orbitControls;
    this.dragControls = null;
    this.sceneObjects = [];
    this.addingObjectShape = null;
    this.enterNameBox = false;
    this.sceneNames = [];
    console.log(this.sceneNames);
    this.currentScene = null;
    this.isObject = false;
    this.doAnimate = true;
  };

  @action
  createNewScene = () => {
    var newScene = new THREE.Scene();
    this.loadCanvas(newScene);
  };

  @action
  loadCanvas = newScene => {
    this.dragControls = new DragControls(
      newScene.children,
      camera,
      threeRender.domElement
    );
    this.scene = newScene;
    this.sceneObjects = this.scene.children;
    this.dragControls.addEventListener('dragstart', function(event) {
      orbitControls.enabled = false;
    });
    this.dragControls.addEventListener('dragend', function(event) {
      orbitControls.enabled = true;
    });
    this.animate();
  };

  @computed
  get getScene() {
    return this.scene;
  }

  @computed
  get getCamera() {
    return camera;
  }

  @computed
  get getDragControls() {
    return this.dragControls;
  }

  @computed
  get getOrbitControls() {
    return this.orbitControls;
  }

  @action
  addObject = object => {
    this.scene.add(object);
    this.onWindowResize();
  };

  @action
  addObjectWithName = name => {
    this.sceneObjects.push({ name: name, shape: this.addingObjectShape });
    var material = new THREE.MeshNormalMaterial({ wireframe: true });
    var geo, object;

    if (this.addingObjectShape === 'sphere')
      geo = new THREE.SphereGeometry(5, 32, 32);

    if (this.addingObjectShape === 'cube') geo = new THREE.BoxGeometry(5, 5, 5);

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
    this.sceneNames.push(scene);
    this.createNewScene();
  };

  @action
  switchScene = scene => {
    this.currentScene = scene;
  };

  // mobx function to render canvas with objects and potential animation
  @action
  renderCanvas = () => {
    // animation to spin object
    if (this.scene) {
      if (this.doAnimate) {
        this.scene.traverse(function(object) {
          if (object.isMesh === true) {
            object.rotation.x += 0.01;
            object.rotation.y += 0.01;
          }
        });
      }
      threeRender.render(this.scene, camera);
    }
  };

  onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    threeRender.setSize(window.innerWidth, window.innerHeight);
  };

  // function to animate movement and add future rotational animation
  animate = () => {
    this.onWindowResize();
    requestAnimationFrame(this.animate);
    // this.onWindowResize();
    this.renderCanvas();
  };

  @action
  disableOrbitDragControls = () => {
    orbitControls.enabled = false;
    this.dragControls.enabled = false;
  };

  @action
  enableOrbitDragControls = () => {
    orbitControls.enabled = true;
    this.dragControls.enabled = true;
  };
}

const sceneStore = new SceneStore();
export default sceneStore;
