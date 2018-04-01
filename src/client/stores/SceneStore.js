import { observable, action, autorun, computed } from 'mobx';
import {
  scene,
  camera,
  threeRender,
  dragControls,
  orbitControls,
  loader
} from '../constants/SceneConstants';
import * as THREE from 'three';
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

class SceneStore {
  @observable scene = scene;
  @observable camera = camera;
  @observable orbitControls = orbitControls;
  @observable dragControls = dragControls;
  @observable sceneObjects = [];
  @observable addingObjectShape = null;
  @observable enterNameBox = false;
  @observable sceneNames = [];
  @observable currentScene = null;
  @observable isObject = false;
  @observable doAnimate = true;
  constructor() {
    // Need to get scenes array based on ownership via username
    // Axios.get();
    autorun(() => console.log('SceneStore'));
    //use animate to animate moving the object and future rotation animation
    //KEVIN EXPLAIN THIS FURTHER PLZ
    this.animate(true);
    // allow camera and object movement for scene children
    //===========TO DO==========================
    // move orbit and drag controls to SceneConstants
    // and write mobx getters to use scene and camera inside SceneConstsnts
    //
    dragControls.addEventListener('dragstart', function(event) {
      orbitControls.enabled = false;
    });

    dragControls.addEventListener('dragend', function(event) {
      orbitControls.enabled = true;
    });

    window.addEventListener('resize', function() {
      threeRender.setSize(window.innerWidth, window.innerHeight, true);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    document.addEventListener('mousedown', this.onObjectClick, false);
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
    this.onWindowResize();
  };

  @action
  addObjectWithName = name => {
    this.sceneObjects.push({ name: name, shape: this.addingObjectShape });
    var material = new THREE.MeshBasicMaterial();
    var map = loader.load(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/NGC_2467_and_Surroundings.jpg/1024px-NGC_2467_and_Surroundings.jpg'
    );
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    material.map = map;
    var geo, object, mesh;

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
    console.log('wtf?!!!!!!!');
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
  };

  @action
  switchScene = scene => {
    this.currentScene = scene;
  };

  // mobx function to render canvas with objects and potential animation
  @action
  renderCanvas = () => {
    // animation to spin object
    if (this.doAnimate) {
      this.scene.traverse(function(object) {
        if (object.isMesh === true) {
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
        }
      });
    }
    raycaster.setFromCamera(mouse, camera);

    threeRender.render(this.scene, this.camera);
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    threeRender.setSize(window.innerWidth, window.innerHeight);
  };

  // function to animate movement and add future rotational animation
  animate = () => {
    requestAnimationFrame(this.animate);
    // this.onWindowResize();
    this.renderCanvas();
  };

  @action
  disableOrbitDragControls = () => {
    orbitControls.enabled = false;
    dragControls.enabled = false;
  };

  @action
  enableOrbitDragControls = () => {
    orbitControls.enabled = true;
    dragControls.enabled = true;
  };

  // clicked to return object
  @action
  onObjectClick = event => {
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = event.clientY / window.innerHeight * 2 - 1;

    var intersects = raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      // console.log('Hit @' + toString(intersects[0].point + '\n'));
      // console.log(intersects[0]);
      return intersects[0];
    }
  };
}

const sceneStore = new SceneStore();
export default sceneStore;
