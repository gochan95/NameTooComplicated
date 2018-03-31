import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
import AuthStore from './client/stores/AuthStore';
import SceneStore from './client/stores/SceneStore';

ReactDOM.render(
  <App SceneStore={SceneStore} AuthStore={AuthStore} />,
  document.getElementById('root')
);
