import React, {
  Component
} from 'react';
import SceneObjectItem from './SceneObjectItem';
import SquareButton from './SquareButton';
import ControlPanelInputGroup from './ControlPanelInputGroup';
import { observer } from 'mobx-react';

import '../styles/SceneObjectItemGroup.css';

@observer
export default class SceneObjectItemGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openObjectList: false
    }
  }

  openObjectList = () => {
    this.setState({ objectDropdown: !this.state.objectDropdown });
  }


  // openControlPanelGroup = () => {
  //   this.setState({ openControlPanel: !this.state.openControlPanel });
  // }

  renderSceneObjectItem = (object, name) => {
    return (
      <SceneObjectItem
        object={object}
        name={name}
        ControlPanelStore={this.props.ControlPanelStore} />
    )
  }



  render() {
    return (
      <div>
        <div className="top-left">
          <SquareButton text="Browse your objects" openObjectList={this.openObjectList.bind(this)}/>
        </div>
        {this.state.objectDropdown &&
          <div className="top-left-drop-down">
            {this.renderSceneObjectItem("sphere", "The sphere object1")}
          </div>
        }
        {this.props.ControlPanelStore.controlPanel &&
          <ControlPanelInputGroup
            ControlPanelStore={this.props.ControlPanelStore}/>
        }
      </div>
    )
  }
}
