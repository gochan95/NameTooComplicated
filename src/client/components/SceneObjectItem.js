import React, {
  Component
} from 'react';

import '../styles/SceneObjectItem.css';

export default class SceneObjectItem extends Component {
  render(){
    return (
      <div className="scene-object-item-container medium-padding padding-right">
        {this.props.sphere &&
          <div className="scene-object-item-icon" id="item-sphere">
          </div>
        }
        {this.props.cube &&
          <div className="scene-object-item-icon" id="item-cube">
          </div>
        }
        {this.props.cone &&
          <div className="scene-object-item-icon" id="item-cone">
          </div>
        }
        {this.props.pyramid &&
          <div className="scene-object-item-icon" id="item-pyramid">
          </div>
        }
        <div className="padding-left scene-object-item-name">
          {this.props.name}
        </div>
      </div>
    );
  }
}
