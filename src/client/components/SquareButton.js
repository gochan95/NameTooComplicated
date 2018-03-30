import React, {
  Component
} from 'react';

import '../styles/SquareButton.css';


export default class SquareButton extends Component{
  constructor(props) {
    super(props);
    this.state = {
      on: this.props.on || false
    }

  }

  componentDidMount() {
    this.props.on && this.setState({ on: true });
    this.props.off && this.setState({ on: false });
  }

  onClick = () => {
    // active icon button
    this.props.off || this.setState({ on: !this.state.on });

    // (!this.props.on && !this.props.off) && this.setState({ on: !this.state.on });
    // this.props.active && this.setState({ on: !this.props.active });
    // (this.props.openObjectList && this.props.openObjectList());
    // (this.props.onPropertyClick && this.props.onPropertyClick());
    (this.props.onClick && this.props.onClick());
  };

  renderIconButton = (iconName) => {
    var icon = this.props[iconName];
    return (
      icon && (
        this.state.on
        ?
        (<div className="square-button-icon" id={`${iconName}-blue-icon`}/>)
        :
        (<div className="square-button-icon" id={`${iconName}-icon`}/>)
      )
    )
  }

  renderUnraisedText= (text) => {
    // var btn = this.props[name];
    return (
      this.state.on
      ?
      (
        <p className="square-button-text blue-text">
          {text}
        </p>
      )
      :
      (
        <p className="square-button-text">
          {text}
        </p>
      )
    );
  }

  renderStayCoolIcon= (name) => {
    var icon = this.props[name];
    return (
      (icon &&
        <div className="square-button-icon" id={`${name}-icon`}/>
      )
    )
  }


  render() {
    return (
      <div className="square-button-container small-padding" onClick={this.onClick}>
        {this.renderIconButton('info')}
        {this.renderIconButton('rockandroll')}
        {this.renderUnraisedText(this.props.text)}
        {this.renderIconButton('add')}
        {this.renderStayCoolIcon('close')}
      </div>
    );
  }
}
