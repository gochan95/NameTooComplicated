import React, {
  Component
} from 'react';
import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';
import ControlPanelInput from './ControlPanelInput';
import ControlPanelLayer from './ControlPanelLayer';
import { observer } from 'mobx-react';

import '../styles/ControlPanelInputGroup.css';

@observer
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

  renderLayerInput = (name) => {
    return (
      <div className="render-layer-input">
        <div className="layer-name">
          {name}
        </div>
        <div className="layer-scroll">
          <ControlPanelLayer/>
          <ControlPanelLayer/>
        </div>
      </div>
    );
  }

  layerClick = () => {
    this.props.ControlPanelStore && this.props.ControlPanelStore.toggleLayerProperties();
  }

  propertyClick = () => {
    this.props.ControlPanelStore && this.props.ControlPanelStore.toggleObjectProperties();
  }

  closeClick = () => {
    this.props.ControlPanelStore && this.props.ControlPanelStore.closeControlPanel();
  }

  render() {
    return (
      <div>
        <div className="top-right">
          <SimpleObjectButton raised object="sphere" onLayerClick={this.layerClick}/>
          <SquareButton text="The sphere object 1" onClick={this.propertyClick}/>
          <SquareButton close onClick={this.closeClick}/>
        </div>
        <div className="top-right-drop-down">
          {this.props.ControlPanelStore.objectProperties && this.renderSphereInput()}
          {this.props.ControlPanelStore.layerProperties && this.renderLayerInput("layer name")}
        </div>
      </div>
    )
  }
}
