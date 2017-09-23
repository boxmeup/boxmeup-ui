import React, { Component } from 'react';
import AuthError from '../errors/AuthError.js';
import { Redirect } from 'react-router-dom'
import { Alert } from 'reactstrap';
import debounce from 'lodash.debounce';

import ContainerService from '../lib/containerservice.js';
import LocationService from '../lib/locationservice.js';

import Panel from './containers/Panel.jsx';
import ContainerList from './containers/ContainerList.jsx';
import FloatingMenu from './layout/FloatingMenu.jsx';

export default class Containers extends Component {
    constructor(props) {
        super(props);
        this.containers = new ContainerService(props.auth.authorizedFetch.bind(props.auth));
        this.locations = new LocationService(props.auth.authorizedFetch.bind(props.auth));
        this.onContainerSelected = this.onContainerSelected.bind(this);
        this.onLocationSelected = this.onLocationSelected.bind(this);
        const lastResponse = JSON.parse(localStorage.getItem('lastContainerResponse'));
        const locations = JSON.parse(localStorage.getItem('allLocations'));
        this.baseMenu = [{
            icon: "plus",
            link: "/containers/add",
            color: "danger",
            tooltip: "Add new container"
        }];
        this.state = {
            containers: lastResponse ? lastResponse.containers || [] : [],
            locations: locations || [],
            total: lastResponse ? lastResponse.meta.total : 0,
            error: null,
            errorType: null,
            selectedContainers: new Set(),
            isLoading: false,
            menu: this.baseMenu
        };
    }

    async componentWillMount() {
        try {
            this.props.setAppState({loading: true});
            const response = await this.containers.containers(this.props.location.search);
            localStorage.setItem('lastContainerResponse', JSON.stringify(response));
            const locations = await this.locations.allLocations();
            localStorage.setItem('allLocations', JSON.stringify(locations));
            this.setState({
                // The server should respond with empty array instead of null
                containers: response.containers || [],
                locations: locations,
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
                        errorType: e.constructor,
                        isLoading: false
                    });
            }
        } finally {
            this.props.setAppState({loading: false});
        }
    }

    onContainerSelected(selectedContainers) {
        this.setState({
            selectedContainers: selectedContainers,
            menu: selectedContainers.size ?
                this.baseMenu.concat([
                    {
                        icon: "print",
                        link: "/containers/print",
                        color: "primary",
                        tooltip: "Bulk print"
                    }
                ]) :
                this.baseMenu
        });
    }

    async onLocationSelected(selectedLocations) {
        try {
            this.props.setAppState({ loading: true });
            const locationURI = selectedLocations.length ?
                '&location_id=' + selectedLocations.join('&location_id=') :
                '';
            const response = await this.containers.containers(this.props.location.search + (this.props.location.search.indexOf('?') > 0 ? '' : '?') + locationURI);
            this.setState({
                error: '',
                containers: response.containers || [],
            });
        } catch (e) {
            console.error(e);
            this.setState({
                error: 'There was a problem filtering your containers.',
                errorType: e.constructor
            });
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
                    <div className="container" style={{marginBottom: '40px'}}>
                        {this.state.error &&
                            <Alert color="danger">
                                <strong>Error!</strong> {this.state.error}
                            </Alert>
                        }
                        <div className="row">
                            <div className="col-md-3 flex-md-last mb-2">
                                <Panel total={this.state.total} max={50} selectedContainers={this.state.selectedContainers} locations={this.state.locations} onLocationSelected={debounce(this.onLocationSelected, 750)} />
                            </div>
                            <div className="col">
                                {this.state.isLoading && <span>loading...</span>}
                                {!this.state.isLoading && this.state.containers.length === 0 && <h4>No containers found.</h4>}
                                {this.state.containers.length > 0 && <ContainerList containers={this.state.containers} onContainerSelected={this.onContainerSelected} />}
                            </div>
                        </div>
                        <FloatingMenu items={this.state.menu}/>
                    </div>
                )
        );
    }
}
