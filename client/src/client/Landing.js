import React, { Component } from 'react';
import SceneGlobalControl from './components/SceneGlobalControl';
import { observer } from 'mobx-react';
import { threeRender } from './constants/SceneConstants';
import { gui_container } from './constants/createGuiData';

import './styles/Landing.css';

@observer
class Landing extends Component {
  componentDidMount() {
    this.mount.appendChild(threeRender.domElement);
    document.getElementById('landing-container').appendChild(gui_container);
    gui_container.addEventListener(
      'mouseover',
      this.props.SceneStore.disableOrbitDragControls
    );
  }

  render() {
    return (
      <div className="landing-container" id="landing-container">
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
