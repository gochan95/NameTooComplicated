import React, {
  Component
} from 'react';

import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';
import SceneObjectItemGroup from './SceneObjectItemGroup';
import { observer } from 'mobx-react';

import '../styles/SceneGlobalControl.css';

@observer
export default class SceneGlobalControl extends Component {

  addClick = () => {
    this.props.ControlPanelStore && this.props.ControlPanelStore.toggleObjectaddGroup();
  }

  infoClick = () => {
    this.props.ControlPanelStore && this.props.ControlPanelStore.toggleBrowseObjects();
  }

  render() {
    return (
      <div>
        <div className="bottom-right">
          <SquareButton info onClick={this.infoClick}/>
          <SquareButton text="2D/3D"/>
          <SquareButton text="Animate" />
          <SquareButton text="Save"/>
          <SquareButton add onClick={this.addClick}/>
        </div>
        {this.props.ControlPanelStore.objectaddGroup &&
          <div className="mid-right">
            <SimpleObjectButton object="sphere"/>
            <SimpleObjectButton object="cube"/>
            <SimpleObjectButton object="cone"/>
            <SimpleObjectButton object="pyramid"/>
            <SimpleObjectButton object="scroll"/>
          </div>
        }
        {this.props.ControlPanelStore.browseObjects &&
          <SceneObjectItemGroup ControlPanelStore={this.props.ControlPanelStore}/>
        }
      </div>
    );
  }
}
