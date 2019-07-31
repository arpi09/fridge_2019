import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Login from './containers/login'
import Home from './containers/home'


class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    )
  }
}

export default App;
