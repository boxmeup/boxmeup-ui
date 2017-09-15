import React, { Component } from 'react';

import ContainerService from '../lib/containerservice.js';

import AuthError from '../errors/AuthError.js';
import { Redirect } from 'react-router-dom'

const findContainerInStorage = function(id) {
    const lastContainerResponse = JSON.parse(localStorage.getItem('lastContainerResponse'));
    const result = lastContainerResponse && lastContainerResponse.containers.filter(container => container.id.toString() === id);
    return result && result.length && result[0];
}

export default class Container extends Component {
    constructor(props) {
        super(props);
        this.container = new ContainerService(props.auth.authorizedFetch.bind(props.auth));
        const containerID = props.computedMatch.params.id;
        // @todo If container is not in local storage call out to API to get it.
        // @todo Retrieve items of the container from API
        const items = JSON.parse(localStorage.getItem(`container${containerID}Items`));
        this.state = {
            id: containerID,
            container: findContainerInStorage(containerID),
            items: items ? items.items || [] : []
        };
    }

    async componentWillMount() {
        try {
            this.props.setAppState({ loading: true });
            if (!this.state.container) {
                this.setState({
                    container: await this.container.containerByID(this.state.id)
                });
            }
            const response = await this.container.containerItemsByID(this.state.id, this.props.location.search);
            localStorage.setItem(`container${this.state.id}Items`, JSON.stringify(response));
            this.setState({
                // The server should respond with empty array instead of null
                items: response.items || [],
                total: response.paged_response.total
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
                    const error = this.state.items.length > 0 ?
                        'Unable to get up-to-date items for this container. Data may be stale.' :
                        'Unable to get items.'
                    this.setState({
                        error: error,
                        errorType: e.constructor,
                        isLoading: false
                    });
            }
        } finally {
            this.props.setAppState({ loading: false });
        }
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
                    <p>Container {this.state.id}</p>
                    <pre><code>{ JSON.stringify(this.state.container, null, '\t') }</code></pre>
                    <p>Items:</p>
                    <pre><code>{ JSON.stringify(this.state.items, null, '\t') }</code></pre>
                </div>
            )
        );
    }
}
