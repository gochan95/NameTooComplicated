import { observable, action, autorun } from 'mobx';
import {
  scene,
  camera,
  threeRender,
  onWindowResize
} from '../constants/SceneConstants';
import DragControls from 'three-dragcontrols';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

class SceneStore {
  @observable scene = scene;
  @observable camera = camera;

  constructor() {
    console.log(this.scene);
    autorun(() => console.log('SceneStore'));
    //use animate to animate moving the object and future rotation animation
    //KEVIN EXPLAIN THIS FURTHER PLZ
    this.animate();
    // allow camera and object movement for scene children
    //===========TO DO==========================
    // move orbit and drag controls to SceneConstants
    // and write mobx getters to use scene and camera inside SceneConstsnts
    var orbitControls = new OrbitControls(this.camera);
    const dragControls = new DragControls(
      this.scene.children,
      this.camera,
      threeRender.domElement
    );
    dragControls.addEventListener('dragstart', function(event) {
      console.log('started drag');
      orbitControls.enabled = false;
    });
    dragControls.addEventListener('dragend', function(event) {
      console.log('ended drag');
      orbitControls.enabled = true;
    });
  }
  // mobx function to add object to scene
  @action
  addObject = object => {
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
    threeRender.render(this.scene, this.camera);
  };
  // function to animate movement and add future rotational animation
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderCanvas();
  };
}

const sceneStore = new SceneStore();
export default sceneStore;
