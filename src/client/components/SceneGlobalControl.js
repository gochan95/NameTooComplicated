import React, {
  Component
} from 'react';

import SquareButton from './SquareButton';
import SimpleObjectButton from './SimpleObjectButton';

import '../styles/SceneGlobalControl.css';

export default class SceneGlobalControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleobject: false
    }
  }
  addOnClick = () => {
    console.log('hello')
    this.setState({ simpleobject: !this.state.simpleobject })
  }
  render() {
    return (
      <div>
        <div className="bottom-right">
          <SquareButton info/>
          <SquareButton text="2D/3D"/>
          <SquareButton text="Animate" />
          <SquareButton add addOnClick={this.addOnClick.bind(this)}/>
        </div>
        {this.state.simpleobject &&
          <div className="mid-right">
            <SimpleObjectButton sphere/>
            <SimpleObjectButton cube/>
            <SimpleObjectButton cone/>
            <SimpleObjectButton pyramid/>
            <SimpleObjectButton scroll/>
          </div>
        }
      </div>
    );
  }
}
