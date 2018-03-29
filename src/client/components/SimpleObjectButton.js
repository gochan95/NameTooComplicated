import React, {
  Component
} from 'react';
import '../styles/SimpleObjectButton.css';
import '../styles/Shapes.css';

export default class SimpleObjectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false
    }
  }


  onClick = () => {
    if (this.props.raised) {
      this.setState({ on: !this.state.on });
    }
    (this.props.onClick && this.props.onClick());
  }

  renderShapeIcon = () => {
    const { object } = this.props;
    return (

      this.state.on
      ?
      <div className="simple-object-icon" id={`shape-${object}-active`}>
      </div>
      :
      <div className="simple-object-icon" id={`shape-${object}`}>
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
