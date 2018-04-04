import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
import AuthStore from './client/stores/AuthStore';
import SceneStore from './client/stores/SceneStore';
import ControlPanelStore from './client/stores/ControlPanelStore';

ReactDOM.render(
  <App
    SceneStore={SceneStore}
    AuthStore={AuthStore}
    ControlPanelStore={ControlPanelStore}
  />,
  document.getElementById('root')
);
