import React, { Component } from 'react';
import AuthError from '../errors/AuthError.js';
import { Redirect } from 'react-router-dom'
import { Alert } from 'reactstrap';

import Panel from './containers/Panel.jsx';
import LocationFilter from './containers/LocationFilter.jsx';
import ContainerList from './containers/ContainerList.jsx';

export default class Containers extends Component {
    constructor(props) {
        super(props);
        this.onContainerSelected = this.onContainerSelected.bind(this);
        const lastResponse = JSON.parse(localStorage.getItem('lastContainerResponse'));
        this.state = {
            containers: lastResponse ? lastResponse.containers : [],
            total: lastResponse ? lastResponse.meta.total : 0,
            error: null,
            errorType: null,
            selectedContainers: new Set()
        };
    }

    async componentWillMount() {
        try {
            const response = await this.props.auth.authorizedFetch('/api/container');
            localStorage.setItem('lastContainerResponse', JSON.stringify(response));
            this.setState({
                containers: response.containers,
                total: response.meta.total
            });
        } catch (e) {
            switch (e.constructor) {
                case AuthError:
                    this.setState({
                        error: e.message,
                        errorType: e.constructor
                    });
                    break;
                default:
                    console.error(e);
                    const error = this.state.containers.length > 0 ?
                        'Unable to get up-to-date containers. Data may be stale.' :
                        'Unable to get containers.'
                    this.setState({
                        error: error,
                        errorType: e.constructor
                    });
            }
        }
    }

    onContainerSelected(selectedContainers) {
        this.setState({
            selectedContainers: selectedContainers
        });
    }

    render() {
        return (
            this.state.errorType === AuthError ? (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location, error: this.state.error }
                }} />
            ) : (
                    <div className="container">
                        {this.state.error &&
                            <Alert color="danger">
                                <strong>Error!</strong> {this.state.error}
                            </Alert>
                        }
                        <div className="row">
                            <div className="col-md-3 flex-md-last mb-2">
                                <Panel total={this.state.total} max={50} selectedContainers={this.state.selectedContainers} />
                                <LocationFilter />
                            </div>
                            <div className="col">
                                {this.state.containers.length === 0 && <span>loading...</span>}
                                <ContainerList containers={this.state.containers} onContainerSelected={this.onContainerSelected} />
                            </div>
                        </div>
                    </div>
                )
        );
    }
}
