import React, {
  Component
} from 'react';
import SceneObjectItem from './SceneObjectItem';
import SquareButton from './SquareButton';

import '../styles/SceneObjectItemGroup.css';

export default class SceneObjectItemGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openObjectList: false
    }
  }

  openObjectList = () => {
    console.log('ooo')
    this.setState({ objectDropdown: !this.state.objectDropdown });
  }

  render() {
    return (
      <div>
        <div className="top-left">
          <SquareButton text="Browse your objects" openObjectList={this.openObjectList.bind(this)}/>
        </div>
        {this.state.objectDropdown &&
          <div className="top-left-drop-down">
            <SceneObjectItem sphere name="The sphere object 1"/>
            <SceneObjectItem sphere name="The sphere object 2"/>
            <SceneObjectItem sphere name="The sphere object 3"/>
            <SceneObjectItem cube name="The cube object 1"/>
            <SceneObjectItem cone name="The cone object 1"/>
            <SceneObjectItem pyramid name="The pyramid object 1"/>
          </div>
        }
      </div>
    )
  }
}
