import React, {
  Component
} from 'react';
import '../styles/SimpleObjectButton.css';

export default class SimpleObjectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true
    }
  }


  onClick = () => {
    if (this.props.raised) {
      this.setState({ on: !this.state.on });
    }
    (this.props.onLayerClick && this.props.onLayerClick());
  }

  renderShapeIcon = () => {
    const { object } = this.props;
    return (

      this.state.on
      ?
      <div className="simple-object-icon" id={`simple-${object}-icon`}>
      </div>
      :
      <div className="simple-object-icon" id={`simple-${object}-icon-active`}>
      </div>
    )
  }

  render() {
    return (
      <div className="simple-object-button-container small-padding" onClick={this.onClick}>
        {this.renderShapeIcon()}
      </div>
    );
  }
}
