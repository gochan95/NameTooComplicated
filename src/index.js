import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
import AuthStore from './client/stores/AuthStore';

ReactDOM.render(<App store={AuthStore}/>, document.getElementById('root'));
