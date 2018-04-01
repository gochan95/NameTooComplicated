import React, { Component } from 'react';
import UnderlineButton from './UnderlineButton';
import { observer } from 'mobx-react';

import '../styles/SceneButtonGroup.css';

@observer
export default class SceneButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSceneText: 'more',
      showMore: false
    };
  }

  onClick = () => {
    this.props.onClick && this.props.onClick();
  };

  renderSceneButton = () => {
    var scenes = this.props.SceneStore.sceneNames;
    var croppedScenes = scenes.filter(
      i => i != this.props.SceneStore.currentScene
    );
    return croppedScenes.map(i => (
      <UnderlineButton
        key={i}
        text={i}
        onClick={this.loadScene.bind(this, i)}
      />
    ));
  };

  loadScene = thisScene => {
    this.props.SceneStore && this.props.SceneStore.switchScene(thisScene);
  };

  showMore = () => {
    if (this.state.showSceneText === 'more') {
      this.setState({
        showSceneText: 'less',
        showMore: true
      });
    } else {
      this.setState({
        showSceneText: 'more',
        showMore: false
      });
    }
  };

  render() {
    const { currentScene } = this.props.SceneStore;
    return (
      <div className="scene-button-group-container">
        {this.state.showMore && this.renderSceneButton()}
        {currentScene && <UnderlineButton active text={currentScene} />}
        {currentScene && (
          <UnderlineButton
            text={this.state.showSceneText}
            onClick={this.showMore}
          />
        )}
      </div>
    );
  }
}
