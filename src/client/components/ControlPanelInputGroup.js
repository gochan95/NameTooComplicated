import React, {
  Component
} from 'react';
import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';
import ControlPanelInput from './ControlPanelInput';
import ControlPanelLayer from './ControlPanelLayer';

import '../styles/ControlPanelInputGroup.css';

export default class ControlPanelInputGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openlayer: false,
      openproperties: false,
    }
  }

  renderSphereInput = () => {
    return (
      <div>
        <ControlPanelInput property="raidus"/>
        <ControlPanelInput property="widthSegments"/>
        <ControlPanelInput property="heightSegments"/>
        <ControlPanelInput property="phiStart"/>
        <ControlPanelInput property="phiLength"/>
        <ControlPanelInput property="thetaStart"/>
        <ControlPanelInput property="thetaLength"/>
      </div>
    );
  }

  renderLayerInput = () => {
    return (
      <div>
        <div>
          <SquareButton text="layer name"/>
        </div>
        <div className="layer-scroll">
          <ControlPanelLayer/>
          <ControlPanelLayer/>
        </div>
      </div>
    );
  }

  onLayerClick = () => {
    this.setState({ openlayer: !this.state.openlayer})
  }

  onPropertyClick = () => {
    this.setState({ openproperties: !this.state.openproperties})
  }

  render() {
    return (
      <div>
        <div className="top-right">
          <SimpleObjectButton sphere onLayerClick={this.onLayerClick.bind(this)}/>
          <SquareButton text="The sphere object 1" onPropertyClick={this.onPropertyClick.bind(this)}/>
          <SquareButton close />
        </div>
        <div className="top-right-drop-down">
          {this.state.openlayer && this.renderLayerInput()}
          {this.state.openproperties && this.renderSphereInput()}
        </div>
      </div>
    )
  }
}
