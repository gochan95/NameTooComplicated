import React, { Component } from 'react';
import Axios from 'axios';
import SimpleObject from './components/SimpleObject';
import SceneToolbar from './components/SceneToolbar';
import ControlPanel from './components/ControlPanel';
import SceneGlobalControl from './components/SceneGlobalControl';
import { observer } from 'mobx-react';
import * as THREE from 'three';
import ControlPanelStore from './stores/ControlPanelStore';


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
      '../textures/brickwall_normal.jpg'
    );
    texture.wrapS = THREE.RepeatWrapping;
    var mesh = new THREE.MeshNormalMaterial({ normalMap: texture });

    // create the Sphere2 component with two states { geometry, mesh }

    var children = this.state.children;
    // children.push(<Sphere radius={3} />);
    children.push(
      <SimpleObject
        cube
        key={this.state.children.length}
        SceneStore={this.props.SceneStore}
        geometry={geometry}
        mesh={mesh}
      />
    );

    this.setState({ children: children });
  }

  componentDidMount() {
    this.props.SceneStore.renderCanvas();
  }

  saveScene = () => {
    console.log('saving scene');
    var cameraid = this.props.SceneStore.cameraObj.uuid;
    var sceneid = this.props.SceneStore.sceneObj.uuid;
    var uuid = sceneid + '-' + cameraid;
    var params = new URLSearchParams();
    params.append('id', uuid);
    params.append('camera', cameraid);
    params.append('scene', sceneid);
    params.append('owner', 'gordon');
    console.log(uuid);
    Axios.post(`/scenes/`, params)
      .then(function(response) {
        console.log('added scenes');
        console.log(response);
      })
      .catch(function(err) {
        console.log('caught an error for saving canvas');
        console.log(err);
      });
    // var canvas = new Canvas({
    //   uuid: BuildScene.scene.uuid + '-' + BuildScene.camera.uuid,
    //   scene: BuildScene.scene,
    //   camera: BuildScene.camera
    // });
    // console.log(canvas);
  };

  getAllScenes = () => {
    var ownername = 'gordon';
    console.log('this is the owner on front end');
    Axios.get(`/scenes/${ownername}`).then(
      function(response) {
        console.log('successful get of scenes');
        console.log(response);
      },
      function(err) {
        console.log('failed to get scenes');
        console.log(err);
      }
    );
  };

  renderChildren() {
    this.getAllScenes();
    console.log(this.state.children);
    return this.state.children;
  }

  render() {
    return (
      <div className="landing-container">
        {this.renderChildren()}
        <SceneGlobalControl ControlPanelStore={ControlPanelStore}/>
      </div>
    );
  }
}

export default Landing;
