import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App2 from './client/App2';
import AuthStore from './client/stores/AuthStore';
import SceneStore from './client/stores/SceneStore';

ReactDOM.render(
  <App2 SceneStore={SceneStore} AuthStore={AuthStore} />,
  document.getElementById('root')
);
