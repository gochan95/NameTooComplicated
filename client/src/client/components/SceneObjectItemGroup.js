import React, { Component } from 'react';
import SceneObjectItem from './SceneObjectItem';
import SquareButton from './SquareButton';
import ControlPanelInputGroup from './ControlPanelInputGroup';
import { observer } from 'mobx-react';

import '../styles/SceneObjectItemGroup.css';
import '../styles/Animation.css';

@observer
export default class SceneObjectItemGroup extends Component {
  deleteObject = object => {
    this.props.SceneStore && this.props.SceneStore.deleteObject(object);
    this.props.ControlPanelStore &&
      this.props.ControlPanelStore.closeControlPanel();
  };

  openObjectList = () => {
    this.props.ControlPanelStore &&
      this.props.ControlPanelStore.toggleBrowseObjectsDropdown();
  };

  renderSceneObjectItem = object => {
    return (
      <div key={object.name} className="flex-default">
        <SceneObjectItem
          object={object}
          ControlPanelStore={this.props.ControlPanelStore}
          SceneStore={this.props.SceneStore}
        />
        <SquareButton
          object={object}
          close
          SceneStore={this.props.SceneStore}
          onClick={this.deleteObject.bind(this, object)}
        />
      </div>
    );
  };

  render() {
    const {
      browseObjectsDropdown,
      controlPanel
    } = this.props.ControlPanelStore;
    const { sceneObjects } = this.props.SceneStore;
    return (
      <div>
        <div className="top-left fadeInLeft">
          {browseObjectsDropdown ? (
            <SquareButton
              on
              text="Browse your objects"
              onClick={this.openObjectList.bind(this)}
              SceneStore={this.props.SceneStore}
              ControlPanelStore={this.props.ControlPanelStore}
            />
          ) : (
            <SquareButton
              text="Browse your objects"
              onClick={this.openObjectList.bind(this)}
              SceneStore={this.props.SceneStore}
              ControlPanelStore={this.props.ControlPanelStore}
            />
          )}
        </div>
        {browseObjectsDropdown && (
          <div className="top-left-drop-down fadeInLeft">
            {sceneObjects.length !== 0 ? (
              sceneObjects.map(object => this.renderSceneObjectItem(object))
            ) : (
              <SquareButton
                off
                rockandroll
                text="Sorry, you haven't add anything yet."
                SceneStore={this.props.SceneStore}
                ControlPanelStore={this.props.ControlPanelStore}
              />
            )}
          </div>
        )}
        {controlPanel && (
          <ControlPanelInputGroup
            ControlPanelStore={this.props.ControlPanelStore}
            SceneStore={this.props.SceneStore}
          />
        )}
      </div>
    );
  }
}
