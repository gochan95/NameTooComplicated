import React, { Component } from 'react';
import Axios from 'axios';
import Sphere from './components/Sphere';
import SimpleObject from './components/SimpleObject';
import Cone from './components/Cone';
import Plane from './components/Plane';
import SceneToolbar from './components/SceneToolbar';
import ControlPanel from './components/ControlPanel';
import { observer } from 'mobx-react';
import * as THREE from 'three';
// import Scene2 from './components/Scene2';

import './styles/Landing.css';

@observer
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
  }
  componentWillMount() {
    var geometry = {
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      phiStart: 0,
      phiLength: 6.3,
      thetaStart: 6,
      thetaLength: 6.3,
      width: 6,
      depth: 6,
      height: 6
    };

    // mesh
    var texture = new THREE.TextureLoader().load(
      './textures/brickwall_normal.jpg'
    );
    texture.wrapS = THREE.RepeatWrapping;
    var mesh = new THREE.MeshNormalMaterial({ normalMap: texture });

    // create the Sphere2 component with two states { geometry, mesh }

    var children = this.state.children;
    children.push(<Sphere radius={3} />);
    // children.push(<SimpleObject cube key={this.state.children.length} store={this.props.store} geometry={geometry} mesh={mesh}/>);
    this.setState({ children: children });
  }

  componentDidMount() {
    this.props.store.renderCanvas();
  }

  // saveScene = () => {
  //   console.log('saving scene');
  //   var uuid = BuildScene.scene.uuid + '-' + BuildScene.camera.uuid;
  //   var params = new URLSearchParams();
  //   params.append('id', uuid);
  //   params.append('camera', BuildScene.camera);
  //   params.append('scene', BuildScene.scene);
  //   // var params = {
  //   //   id: uuid,
  //   //   scene: BuildScene.scene,
  //   //   camera: BuildScene.camera
  //   // }
  //   console.log(uuid);
  //   Axios.post(`/scenes/`, params)
  //     .then(function(response) {
  //       console.log('added scenes');
  //       console.log(response);
  //     })
  //     .catch(function(err) {
  //       console.log('caught an error for saving canvas');
  //       console.log(err);
  //     });
  //   // var canvas = new Canvas({
  //   //   uuid: BuildScene.scene.uuid + '-' + BuildScene.camera.uuid,
  //   //   scene: BuildScene.scene,
  //   //   camera: BuildScene.camera
  //   // });
  //   // console.log(canvas);
  // };
  renderChildren() {
    console.log(this.state.children);
    return this.state.children;
  }

  render() {
    return (
      <div className="landing-container">
        {this.renderChildren()}
        <ControlPanel
          title="Scene Objects"
          position="top-left"
          buttons={['1', '2']}
        />
        <ControlPanel
          title="Object properties"
          position="top-right"
          sliders={['radius', 'height', 'width']}
        />
      </div>
    );
  }
}
// <div>
//   {this.renderChildren()}
//   <SceneToolbar
//     addPlane={this.addPlane.bind(this)}
//     addSphere={this.addSphere.bind(this)}
//     addCone={this.addCone.bind(this)}
//   />
// </div>

export default Landing;
