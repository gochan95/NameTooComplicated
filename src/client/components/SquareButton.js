import React, {
  Component
} from 'react';

import '../styles/SquareButton.css';


export default class SquareButton extends Component{
  constructor(props) {
    super(props);
    this.state = {
      on: true
    }
  }

  onClick = () => {
    this.setState({on: !this.state.on});
    (this.props.addOnClick && this.props.addOnClick());
  };


  render() {
    return (
      <div className="square-button-container small-padding" onClick={this.onClick}>
        {this.props.info &&
          (
            this.state.on
              ? (
                <div className="square-button-icon" id="info-icon">
                </div>
              )
              : (
                <div className="square-button-icon" id="info-blue-icon">
                </div>
              )


        )}
        {
          this.state.on
          ?
          (
            <p className="square-button-text">
              {this.props.text}
            </p>
          )
          :
          (
            <p className="square-button-text blue-text">
              {this.props.text}
            </p>
          )
        }

        {this.props.add &&
          (
            this.state.on
            ?
            (
              <div className="square-button-icon" id="add-canvas">
              </div>
            )
            :
            (
              <div className="square-button-icon" id="add-canvas-blue">
              </div>
            )
          )
        }

      </div>
    );
  }
}
