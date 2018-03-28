import React, {
  Component
} from 'react';
import '../styles/SimpleObjectButton.css';

export default class SimpleObjectButton extends Component {
  render() {
    return (
      <div className="simple-object-button-container small-padding">
        {this.props.sphere &&
          <div className="simple-object-icon" id="simple-sphere-icon">
          </div>
        }
        {this.props.cube &&
          <div className="simple-object-icon" id="simple-cube-icon">
          </div>
        }
        {this.props.cone &&
          <div className="simple-object-icon" id="simple-cone-icon">
          </div>
        }
        {this.props.pyramid &&
          <div className="simple-object-icon" id='simple-pyramid-icon'>
          </div>
        }
        {this.props.scroll &&
          <div className="simple-object-icon" id='simple-scroll-icon'>
          </div>
        }
      </div>
    );
  }
}
