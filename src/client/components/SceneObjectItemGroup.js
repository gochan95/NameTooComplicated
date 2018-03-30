import React, {
  Component
} from 'react';
import SceneObjectItem from './SceneObjectItem';
import SquareButton from './SquareButton';
import ControlPanelInputGroup from './ControlPanelInputGroup';
import { observer } from 'mobx-react';

import '../styles/SceneObjectItemGroup.css';
import '../styles/Animation.css';

@observer
export default class SceneObjectItemGroup extends Component {

  deleteObject = (object) => {
    this.props.SceneStore && this.props.SceneStore.deleteObject(object);
    this.props.ControlPanelStore && this.props.ControlPanelStore.closeControlPanel();
  }

  openObjectList = () => {
    this.props.ControlPanelStore && this.props.ControlPanelStore.toggleBrowseObjectsDropdown();
  }

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
        <div className="top-left fadeInLeft">
          {this.props.ControlPanelStore.browseObjectsDropdown
            ?
            <SquareButton on text="Browse your objects" onClick={this.openObjectList.bind(this)}/>
            :
            <SquareButton text="Browse your objects" onClick={this.openObjectList.bind(this)}/>
          }

        </div>
        {this.props.ControlPanelStore.browseObjectsDropdown &&
          <div className="top-left-drop-down fadeInLeft">
            {
              (this.props.SceneStore.sceneObjects.length !== 0)
              ?
              this.props.SceneStore.sceneObjects.map(object => this.renderSceneObjectItem(object))
              :
              <SquareButton off rockandroll text="Sorry, you haven't add anything yet."/>
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
