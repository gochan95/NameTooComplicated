import React, { Component } from 'react';
import Sphere from './components/Sphere';
import Cone from './components/Cone';

//styles
import './styles/Landing.css';

export default class Canvas extends Component {
  render() {
    return (
      <div>
        <Sphere radius="4" />
        <Cone />
      </div>
    );
  }
}
