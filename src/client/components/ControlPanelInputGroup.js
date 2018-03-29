import React, {
  Component
} from 'react';
import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';
import ControlPanelInput from './ControlPanelInput';
import ControlPanelLayer from './ControlPanelLayer';
import { observer } from 'mobx-react';

import '../styles/ControlPanelInputGroup.css';
import '../styles/Animation.css';

@observer
export default class ControlPanelInputGroup extends Component {

  renderSphereInput = () => {
    var sphereprops = ["radius","widthSegments", "heightSegments", "phiStart","phiLength","thetaStart", "thetaLength"];
    // const cubeprops = ["width","height", "depth", "widthSegments","heightSegments","depthSegments"];
    // const coneprops = ["radius", "height", "radialSegments", "heightSegments", "openEnded", "thetaStart", "thetaLength
    // "];
    // const pyramidprops = []
    return (
      <div className="fadeInRight">
        {sphereprops.map(i => <ControlPanelInput key={`${i}`} property={`${i}`}/>)}
      </div>
    );
  }

  // renderCubeInput = () => {
  //   const cubeprops = ["width","height", "depth", "widthSegments","heightSegments","depthSegments"];
  //   return (
  //     <div>
  //       {cubeprops.map(i => return (<ControlPanelInput property={`${i}`}))}
  //     </div>
  //   )
  // }

  renderLayerInput = (name) => {
    return (
      <div className="render-layer-input fadeInRight">
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

  getCurrentObject = () => {
    if (this.props.ControlPanelStore) {
      console.log(this.props.ControlPanelStore.getSelectedObject);
      return this.props.ControlPanelStore.getSelectedObject;
    }
  }

  render() {
    return (
      <div>
        <div className="top-right fadeInRight">
          <SimpleObjectButton raised object={`${this.getCurrentObject().shape}`} onClick={this.layerClick}/>
          <SquareButton text={`${this.getCurrentObject().name}`} onClick={this.propertyClick}/>
          <SquareButton close onClick={this.closeClick}/>
        </div>
        <div className="top-right-drop-down fadeInDown">
          {this.props.ControlPanelStore.objectProperties && this.renderSphereInput()}
          {this.props.ControlPanelStore.layerProperties && this.renderLayerInput("layer name")}
        </div>
      </div>
    )
  }
}
