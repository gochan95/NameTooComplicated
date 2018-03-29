import React, {
  Component
} from 'react';

import '../styles/SceneObjectItem.css';
import '../styles/Shapes.css';

export default class SceneObjectItem extends Component {
  renderShapeIcon = () => {
    const { object } = this.props;
    console.log(object);
    return (
      <div
        className="scene-object-item-icon"
        id={`shape-${object.shape}`}>
      </div>
    )
  }

  onClick = () => {
    const { object } = this.props;
    (this.props.ControlPanelStore && this.props.ControlPanelStore.openControlPanel(object));
  }

  render(){
    return (
      <div onClick={this.onClick}
        className="scene-object-item-container medium-padding padding-right">
        {this.renderShapeIcon()}
        <div className="padding-left scene-object-item-name">
          {this.props.object.name}
        </div>
      </div>
    );
  }
}
