// packages import
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Landing from './Landing';
// files import
import './styles/App.css';

export default class App extends Component {
    render() {
        return (
          <Router>
            <div>
              <div className="title-bar">
                <div className="title-bar-text">Draw.Squad</div>
              </div>
              <Route exact path="/" component={Landing}/>
            </div>
          </Router>
        );
    }
}