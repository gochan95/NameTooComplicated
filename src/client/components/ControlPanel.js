import React, {
  Component
} from 'react';
import '../styles/ControlPanel.css';

export default class ControlPanel extends Component {

  constructor(props) {
    super(props);

  }

  renderSlider = (title) => {
    return (
      <div key={title} className="control-panel-type-container border-no-padding">
        <p className="medium-text title-padding-right">{title}</p>
        <input className="control-panel-slider-content medium-text" type="range"/>
      </div>
    );
  }

  renderButton = (text) => {
    return (
      <div key={text} className="control-panel-type-container border">
        <div className="control-panel-button" id="sphere-icon"></div>
        <p className="medium-text">{text}</p>
      </div>
    );
  }

  renderInput = (title) => {
    return (
      <div className="control-panel-type-container border">
        <p className="medium-text title-padding-right">{title}</p>
        <input className="control-panel-input-box" placeholder="change this value"/>
      </div>
    );
  }

  renderCheckbox = (title) => {
    return (
      <div className="control-panel-type-container border-no-padding">
        <input className="control-panel-checkbox-content" type="checkbox"/>
        <p className="medium-text title-padding-left">{title}</p>
      </div>
    );
  }

  renderGroups = () => {
    const {sliders, buttons, title} = this.props
    return (
      <div className="control-panel-groups">
        <p className="large-text title-padding-left title-padding-right">{title}</p>
        {buttons && buttons.map(button => this.renderButton(button))}
        {sliders && sliders.map(slider => this.renderSlider(slider))}
      </div>
    );
  }

  render(){
    const {position} = this.props
    return (
      <div className={`control-panel-container ${position}`}>
        {this.renderGroups()}
      </div>
    );
  }
}

// {this.renderSlider("slider")}
// {this.renderButton("button")}
// {this.renderInput("input title")}
// {this.renderButton("buttonlongtextnameishere")}
// {this.renderCheckbox("checkbox")}
// {this.renderButton("button2")}
