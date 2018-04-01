import React, { Component } from 'react';
import { observer } from 'mobx-react';

import '../styles/SceneInputBox.css';
import '../styles/Animation.css';

@observer
export default class SceneInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var isObject = this.props.SceneStore.isObject;
    var checkname;
    if (isObject) {
      //check objects same name
      if (this.props.SceneStore) {
        checkname = this.props.SceneStore.sceneObjects.find(
          object => object.name === this.state.value
        );
      }
      if (!checkname && this.props.SceneStore) {
        this.props.SceneStore.addObjectWithName(this.state.value);
        this.props.SceneStore.closeNameBox();
        this.props.ControlPanelStore.openControlPanelWithObjects();
        this.setState({
          value: ''
        });
      }
    } else {
      //check scenes same name
      if (this.props.SceneStore) {
        checkname = this.props.SceneStore.sceneNames.find(
          object => object === this.state.value
        );
      }
      if (!checkname && this.props.SceneStore) {
        this.props.SceneStore.addScene(this.state.value);
        this.props.SceneStore.closeNameBox();
        this.setState({
          value: ''
        });
      }
    }
  };

  render() {
    return (
      <div className="scene-input-box-container small-padding fadeInRight">
        <form onSubmit={this.handleSubmit}>
          <input
            className="scene-input-box-inner"
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
