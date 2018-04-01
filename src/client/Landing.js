import React, { Component } from 'react';
import Axios from 'axios';
import SimpleObject from './components/SimpleObject';
import SceneGlobalControl from './components/SceneGlobalControl';
import { observer } from 'mobx-react';
import * as THREE from 'three';
import { threeRender } from './constants/SceneConstants';
// import ControlPanelStore from './stores/ControlPanelStore';
// import SceneStore from './stores/SceneStore';

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

  componentDidMount() {
    this.mount.appendChild(threeRender.domElement);
  }

  render() {
    return (
      <div className="landing-container">
        {/* {this.renderChildren()} */}
        <div
          onMouseOver={() => {
            this.props.SceneStore.enableOrbitDragControls();
          }}
          className="object-container"
          ref={mount => {
            this.mount = mount;
          }}
        />
        <SceneGlobalControl
          AuthStore={this.props.AuthStore}
          SceneStore={this.props.SceneStore}
          ControlPanelStore={this.props.ControlPanelStore}
        />
      </div>
    );
  }
}

export default Landing;
