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
    const { browseObjectsDropdown, controlPanel } = this.props.ControlPanelStore;
    const { sceneObjects } = this.props.SceneStore;
    return (
      <div>
        <div className="top-left fadeInLeft">
          {browseObjectsDropdown
            ?
            <SquareButton on text="Browse your objects" onClick={this.openObjectList.bind(this)}/>
            :
            <SquareButton text="Browse your objects" onClick={this.openObjectList.bind(this)}/>
          }

        </div>
        {browseObjectsDropdown &&
          <div className="top-left-drop-down fadeInLeft">
            {
              (sceneObjects.length !== 0)
              ?
              sceneObjects.map(object => this.renderSceneObjectItem(object))
              :
              <SquareButton off rockandroll text="Sorry, you haven't add anything yet."/>
            }
          </div>
        }
        {controlPanel &&
          <ControlPanelInputGroup
            ControlPanelStore={this.props.ControlPanelStore}/>
        }
      </div>
    )
  }
}
