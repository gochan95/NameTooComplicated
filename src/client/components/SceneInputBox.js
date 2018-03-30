import React, {
  Component
} from 'react';

import '../styles/SceneInputBox.css';
import '../styles/Animation.css';

export default class SceneInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.SceneStore) {
      var checkname = this.props.SceneStore.sceneObjects.find(object => object.name == this.state.value);
    }
    if (!checkname && this.props.SceneStore) {
      this.props.SceneStore.addObjectWithName(this.state.value);
      this.props.SceneStore.closeNameBox();
      this.setState({
        value: ""
      });
    }
  }

  render(){
    return (
      <div className="scene-input-box-container small-padding fadeInRight">
        <form onSubmit={this.handleSubmit}>
          <input className="scene-input-box-inner" placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}
