import React, { Component } from 'react';
import Axios from 'axios';
import Sphere from './components/Sphere';
import Cone from './components/Cone';
import Plane from './components/Plane';
import SceneToolbar from './components/SceneToolbar';
import BuildScene from './components/BuildScene';

import './styles/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
  }

  addPlane = () => {
    var children = this.state.children;
    children.push(<Plane key={this.state.children.length} />);
    this.setState({ children: children });
  };

  addSphere = () => {
    var children = this.state.children;
    children.push(<Sphere radius={3} key={this.state.children.length} />);
    this.setState({ children: children });
  };
  addCone = () => {
    var children = this.state.children;
    children.push(<Cone key={this.state.children.length} />);
    this.setState({ children: children });
  };
  saveScene = () => {
    console.log('saving scene');
    console.log(BuildScene.scene);
    console.log(BuildScene.camera);
    var uuid = BuildScene.scene.uuid + '-' + BuildScene.camera.uuid;
    var params = new URLSearchParams();
    params.append('id', uuid);
    params.append('camera', BuildScene.camera);
    params.append('scene', BuildScene.scene);
    // var params = {
    //   id: uuid,
    //   scene: BuildScene.scene,
    //   camera: BuildScene.camera
    // }
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
  renderChildren() {
    return this.state.children;
  }

  render() {
    return (
      <div style={{ width: '80%', height: '80%' }}>
        {/* <controlpanel /> */}
        {this.renderChildren()}
        <SceneToolbar
          addPlane={this.addPlane}
          addSphere={this.addSphere}
          addCone={this.addCone}
          saveScene={this.saveScene.bind(this)}
        />
      </div>
    );
  }
}

export default Landing;
