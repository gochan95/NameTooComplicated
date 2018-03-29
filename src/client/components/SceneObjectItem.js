import React, {
  Component
} from 'react';

import '../styles/SceneObjectItem.css';

export default class SceneObjectItem extends Component {
  renderShapeIcon = () => {
    const { object } = this.props;
    return (
      <div
        className="scene-object-item-icon"
        id={`item-${object}`}>
      </div>
    )
  }

  onClick = () => {
    (this.props.ControlPanelStore && this.props.ControlPanelStore.openControlPanel());
  }

  render(){
    return (
      <div onClick={this.onClick}
        className="scene-object-item-container medium-padding padding-right">
        {this.renderShapeIcon()}
        <div className="padding-left scene-object-item-name">
          {this.props.name}
        </div>
      </div>
    );
  }
}
