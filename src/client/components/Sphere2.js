import React, {
  Component
} from 'react';
import * as THREE from 'three';

export default class Sphere2 extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     geometry: null,
  //     material: null
  //   }
  // }

  addObject = (object) => {
    this.props.store.addObject(object);
  }

  componentWillMount() {
    const { geometry } = this.props;

    var sphereGeometry = new THREE.SphereGeometry(
      geometry.radius,
      geometry.widthSegments,
      geometry.phiStart,
      geometry.phiLength,
      geometry.thetaStart,
      geometry.thetaLength
    );

    var texture = new THREE.TextureLoader().load('./textures/brickwall_normal.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    var mesh = new THREE.MeshNormalMaterial({normalMap: texture});

    var sphere = new THREE.Mesh(sphereGeometry, mesh);

    this.addObject(sphere);
    // buildSceneFunctions.objects.push(sphere);
    // this.mount.appendChild(buildSceneFunctions.renderer.domElement);
  }

  render() {
    return (
      <div className="sphere-container">
      </div>
    )
  }
}
