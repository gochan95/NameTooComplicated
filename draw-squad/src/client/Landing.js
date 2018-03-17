import React, {
  Component
} from 'react';
import Login from './components/Login';

//styles
import './styles/Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="intro-container">
        </div>
        <Login/>
      </div>

    );
  }
}
