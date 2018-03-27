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
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

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

    document.addEventListener( 'mousedown', this.onObjectClick, false );
  }
  // mobx function to add object to scene
  @action
  addObject = object => {
    console.log('add object')
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
  @action onObjectClick = (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;



    var intersects = raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      console.log('Hit @' + toString(intersects[0].point + '\n'));
      console.log(intersects[0]);
      return intersects[0]
    }
  }

}

const sceneStore = new SceneStore();
export default sceneStore;
