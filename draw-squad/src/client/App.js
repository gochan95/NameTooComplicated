// packages import
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// files import
import logo from './icons/logo.svg';
import './styles/App.css';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
);

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={Home}/>
          <Route path="/topics" component={Home}/>
        </div>
      </Router>
  );
  }
}
