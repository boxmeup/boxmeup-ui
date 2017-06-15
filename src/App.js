import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './components/layout/header.jsx';
import LoginPage from './components/login.jsx';
import Logout from './components/logout.jsx';
import NotFound from './components/notfound.jsx';
import Dashboard from './components/dashboard.jsx';

const browserHistory = createBrowserHistory({});

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/logout" component={Logout}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
