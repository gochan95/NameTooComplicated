import React, { Component } from 'react';
import Axios from 'axios';
import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';
import SceneObjectItemGroup from './SceneObjectItemGroup';
import SceneInputBox from './SceneInputBox';
import SceneButtonGroup from './SceneButtonGroup';
import { observer } from 'mobx-react';
import { objectLoader } from '../constants/SceneConstants';

import '../styles/SceneGlobalControl.css';
import '../styles/Animation.css';
import Shapes from '../constants/Shapes';

@observer
export default class SceneGlobalControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameBoxPlaceholder: ''
    };
  }
  addClick = () => {
    this.props.ControlPanelStore &&
      this.props.ControlPanelStore.toggleObjectaddGroup();
    this.props.SceneStore && this.props.SceneStore.closeNameBox();
  };

  infoClick = () => {
    this.props.ControlPanelStore &&
      this.props.ControlPanelStore.toggleBrowseObjects();
  };

  saveScene = () => {
    console.log('saving scene');
    var scene = this.props.SceneStore.getScene;
    var camera = this.props.SceneStore.getCamera;
    var sceneid = scene.uuid;
    var cameraid = camera.uuid;
    var uuid = sceneid + '-' + cameraid;
    var params = new URLSearchParams();
    console.log(scene);
    console.log(camera);
    console.log(uuid);
    console.log(this.props.SceneStore.currentScene);
    console.log(this.props.AuthStore.usersName);
    var timestamp = new Date();
    console.log(timestamp);
    params.append('id', uuid);
    params.append('timestamp', timestamp);
    params.append('name', this.props.SceneStore.currentScene);
    params.append('scene', JSON.stringify(scene));
    params.append('owner', this.props.AuthStore.usersName);
    objectLoader.parse(scene.toJSON(), res => {
      console.log(res);
    });
    Axios.post(`/scenes/`, params)
      .then(function(response) {
        console.log('added scene');
        console.log(response);
      })
      .catch(function(err) {
        console.log('caught an error for saving canvas');
        console.log(err);
      });
  };

  addToScene = object => {
    console.log(object);
    this.setState({ nameBoxPlaceholder: `Enter ${object} object name` });
    this.props.SceneStore && this.props.SceneStore.openNameBox();
    this.props.SceneStore && this.props.SceneStore.setIsObject(true);
    this.props.SceneStore &&
      this.props.SceneStore.setObjectShapeTobeAdd(object);
  };

  addScene = () => {
    this.setState({ nameBoxPlaceholder: 'Enter canvas name' });
    this.props.SceneStore && this.props.SceneStore.setIsObject(false);
    this.props.SceneStore && this.props.SceneStore.openNameBox();
  };

  controlAnimate = () => {
    this.props.SceneStore.doAnimate = !this.props.SceneStore.doAnimate;
  };

  renderSimpleObjectButton = shape => {
    return (
      <SimpleObjectButton
        key={shape}
        object={shape}
        onClick={this.addToScene.bind(this, shape)}
      />
    );
  };

  render() {
    const { objectaddGroup, browseObjects } = this.props.ControlPanelStore;
    return (
      <div>
        <div
          className="bottom-right"
          onMouseOver={this.props.SceneStore.disableOrbitDragControls}
        >
          {this.props.SceneStore.enterNameBox && (
            <SceneInputBox
              placeholder={this.state.nameBoxPlaceholder}
              SceneStore={this.props.SceneStore}
              ControlPanelStore={this.props.ControlPanelStore}
            />
          )}
          {browseObjects && <SquareButton info on onClick={this.infoClick} />}
          {!browseObjects && <SquareButton info onClick={this.infoClick} />}

          <SquareButton text="2D/3D" />
          <SquareButton off text="Save" onClick={this.saveScene} />
          <SquareButton text="Animate" onClick={this.controlAnimate} />
          <SquareButton add onClick={this.addClick} />
        </div>
        {objectaddGroup && (
          <div
            className="mid-right fadeInUp"
            onMouseOver={this.props.SceneStore.disableOrbitDragControls}
          >
            {Shapes.allshapes.map(shape =>
              this.renderSimpleObjectButton(shape)
            )}
            <SimpleObjectButton object="scroll" onClick={this.addScene} />
          </div>
        )}
        {browseObjects && (
          <SceneObjectItemGroup
            ControlPanelStore={this.props.ControlPanelStore}
            SceneStore={this.props.SceneStore}
          />
        )}
        <div
          className="bottom-left"
          onMouseOver={this.props.SceneStore.disableOrbitDragControls}
        >
          <SceneButtonGroup SceneStore={this.props.SceneStore} />
        </div>
      </div>
    );
  }
}
