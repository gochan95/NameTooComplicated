import React, { Component } from 'react';

import '../styles/ControlPanelLayer.css';

import image from '../images/earthmap1k.jpg';

export default class ControlPanelLayer extends Component {
  render() {
    return (
      <div className="control-panel-layer-container small-padding">
        <img className="layer-image" src={image} />
      </div>
    );
  }
}
