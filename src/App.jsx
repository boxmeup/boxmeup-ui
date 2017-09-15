import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PrivateRoute from './PrivateRoute.jsx';
import Auth from './Auth.js';

import AppState from './AppState.jsx';
import Header from './components/layout/header.jsx';
import LoginPage from './components/login.jsx';
import Logout from './components/logout.jsx';
import NotFound from './components/notfound.jsx';
import Containers from './components/containers.jsx';
import Container from './components/container.jsx'

const browserHistory = createBrowserHistory({});
const auth = new Auth();

export default class App extends Component {
    render() {
        return (
                <div className="App">
                    <Router history={browserHistory}>
                        <AppState>
                            <Header auth={auth} />
                            <Switch>
                                <PrivateRoute exact path="/" auth={auth} component={(props) => <Redirect to={{ pathname: '/containers', push: false }} {...props} />} />
                                <PrivateRoute exact path="/containers" auth={auth} component={(props) => <Containers auth={auth} history={browserHistory} {...props} />} />
                                <PrivateRoute exact path="/containers/view/:id" auth={auth} component={(props) => <Container auth={auth} history={browserHistory} {...props} />} />
                                <Route exact path="/login" component={(props) => <LoginPage auth={auth} {...props} />} />
                                <Route exact path="/logout" component={(props) => <Logout auth={auth} {...props} />} />
                                <Route component={NotFound} />
                            </Switch>
                            <footer>&nbsp;</footer>
                        </AppState>
                    </Router>
                </div>
        );
    }
}
