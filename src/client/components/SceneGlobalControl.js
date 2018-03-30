import React, { Component } from 'react';
import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';
import SceneObjectItemGroup from './SceneObjectItemGroup';
import SceneInputBox from './SceneInputBox';
import { observer } from 'mobx-react';

import '../styles/SceneGlobalControl.css';
import '../styles/Animation.css';

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

  addToScene = object => {
    console.log(object);
    this.setState({ nameBoxPlaceholder: `Enter ${object} object name` });
    this.props.SceneStore && this.props.SceneStore.openNameBox();
    this.props.SceneStore &&
      this.props.SceneStore.setObjectShapeTobeAdd(object);
  };

  addScene = () => {
    this.setState({ nameBoxPlaceholder: 'Enter canvas name' });
    this.props.SceneStore && this.props.SceneStore.openNameBox();
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
    var shapes = [
      'sphere',
      'cube',
      'cone',
      'cylinder',
      'tetrahedron',
      'octahedron',
      'icosahedron'
    ];
    return (
      <div>
        <div className="bottom-right">
          {this.props.SceneStore.enterNameBox && (
            <SceneInputBox
              placeholder={this.state.nameBoxPlaceholder}
              SceneStore={this.props.SceneStore}
            />
          )}
          <SquareButton info onClick={this.infoClick} />
          <SquareButton text="2D/3D" />
          <SquareButton text="Animate" />
          <SquareButton unraised text="Save" />
          <SquareButton add onClick={this.addClick} />
        </div>
        {this.props.ControlPanelStore.objectaddGroup && (
          <div className="mid-right fadeInUp">
            {shapes.map(shape => this.renderSimpleObjectButton(shape))}
            <SimpleObjectButton object="scroll" onClick={this.addScene} />
          </div>
        )}
        {this.props.ControlPanelStore.browseObjects && (
          <SceneObjectItemGroup
            ControlPanelStore={this.props.ControlPanelStore}
            SceneStore={this.props.SceneStore}
          />
        )}
      </div>
    );
  }
}
