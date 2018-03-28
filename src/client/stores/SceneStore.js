import { observable, action, autorun, computed } from 'mobx';
import {
  scene,
  camera,
  threeRender,
  onWindowResize,
  dragControls,
  orbitControls
} from '../constants/SceneConstants';
import DragControls from 'three-dragcontrols';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

class SceneStore {
  @observable scene = scene;
  @observable camera = camera;
  @observable orbitControls = orbitControls;
  @observable dragControls = dragControls;

  constructor() {
    // Need to get scenes array based on ownership via username
    // Axios.get();
    console.log(this.scene);
    autorun(() => console.log('SceneStore'));

    console.log(scene);
    console.log(camera);
    console.log(this.orbitControls);
    console.log(this.dragControls);
    var testOrbit = this.orbitControls;
    console.log(testOrbit);
    // var testOrbit = this.orbitControls;
    //use animate to animate moving the object and future rotation animation
    //KEVIN EXPLAIN THIS FURTHER PLZ
    this.animate();

    this.disableOrbitControls();
    this.enableOrbitControls();
    // allow camera and object movement for scene children
    //===========TO DO==========================
    // move orbit and drag controls to SceneConstants
    // and write mobx getters to use scene and camera inside SceneConstsnts
    // this.dragControls.addEventListener('dragstart', function(event) {
    //   // this.orbitControls.enabled = false;
    //   testOrbit.enabled = false;
    //   console.log(testOrbit);
    // });
    // this.dragControls.addEventListener('dragend', function(event) {
    //   // this.orbitControls.enabled = true;
    // });

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

  disableOrbitControls() {
    var testOrbit = this.orbitControls;
    dragControls.addEventListener('dragstart', function(event) {
      // this.orbitControls.enabled = false;
      orbitControls.enabled = false;
      console.log(testOrbit);
    });
  }

  enableOrbitControls() {
    var testOrbit = this.orbitControls;
    dragControls.addEventListener('dragend', function(event) {
      orbitControls.enabled = true;
    });
    // console.log('ended drag');
    // console.log(this.orbitControls);
    // this.orbitControls.enabled = true;
  }
  // mobx function to add object to scene
  @action
  addObject = object => {
    console.log('add object');
    this.scene.add(object);
    onWindowResize();
  };

  // mobx function to render canvas with objects and potential animation
  @action
  renderCanvas = () => {
    // animation to spin object
    // this.scene.traverse(function(object) {
    //   if (object.isMesh === true) {
    //     object.rotation.x += 0.01;
    //     object.rotation.y += 0.01;
    //     object.rotation.z += 0.01;
    //     object.position.z -= 0.01;
    //     object.scale.set(1, 2, 1);
    //   }
    // });
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
