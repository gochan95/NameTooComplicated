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
    this.animate();
    var orbitControls = new OrbitControls(this.camera);
    console.log(orbitControls);
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

  @action
  addObject = object => {
    console.log('adding object');
    console.log(object);
    this.scene.add(object);
    onWindowResize();
  };

  @action
  renderCanvas = () => {
    console.log('rendering canvas');
    console.log(this.scene);
    console.log(this.camera);
    console.log(threeRender);
    scene.traverse(function(object) {
      if (object.isMesh === true) {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        object.rotation.z += 0.01;
        object.position.z -= 0.01;
        object.scale.set(1, 2, 1);
      }
    });
    threeRender.render(this.scene, this.camera);
  };

  animate = () => {
    // requestAnimationFrame(animate);
    this.renderCanvas();
  };
}

const sceneStore = new SceneStore();
export default sceneStore;
