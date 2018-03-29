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

  renderSceneObjectItem = (object) => {
    return (
      <SceneObjectItem
        key={object.name}
        object={object}
        ControlPanelStore={this.props.ControlPanelStore} />
    )
  }



  render() {
    const objectlist = [
      {"name": 'The object sphere 1',
         "shape": "sphere"},
      {"name": 'The object cube 1',
         "shape": "cube"},
      {"name": 'The object cone 1',
         "shape": "cone"},
      {"name": 'The object pyramid 1',
         "shape": "pyramid"}
       ]
    return (
      <div>
        <div className="top-left">
          <SquareButton text="Browse your objects" openObjectList={this.openObjectList.bind(this)}/>
        </div>
        {this.state.objectDropdown &&
          <div className="top-left-drop-down">
            {objectlist.map(object => this.renderSceneObjectItem(object))}
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
