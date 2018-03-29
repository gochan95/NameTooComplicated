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

  deleteObject = (object) => {
    this.props.SceneStore && this.props.SceneStore.deleteObject(object)
  }

  openObjectList = () => {
    this.setState({ objectDropdown: !this.state.objectDropdown });
  }


  // openControlPanelGroup = () => {
  //   this.setState({ openControlPanel: !this.state.openControlPanel });
  // }

  renderSceneObjectItem = (object) => {
    return (
      <div key={object.name} className="flex-default">
        <SceneObjectItem
          object={object}
          ControlPanelStore={this.props.ControlPanelStore} />
        <SquareButton close onClick={this.deleteObject.bind(this, object)}/>
      </div>
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
            {
              (this.props.SceneStore.sceneObjects.length !== 0)
              ?
              this.props.SceneStore.sceneObjects.map(object => this.renderSceneObjectItem(object))
              :
              <SquareButton unraised rockandroll text="Sorry, you haven't add anything yet."/>
            }
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
