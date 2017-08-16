import React, { Component } from 'react';

const findContainerInStorage = function(id) {
    const lastContainerResponse = JSON.parse(localStorage.getItem('lastContainerResponse'));
    const result = lastContainerResponse.containers.filter(container => container.id.toString() === id);
    return result.length && result[0];
}

export default class Container extends Component {
    constructor(props) {
        super(props);
        const containerID = props.computedMatch.params.id;
        // @todo If container is not in local storage call out to API to get it.
        // @todo Retrieve items of the container from API
        this.state = {
            id: containerID,
            container: findContainerInStorage(containerID)
        };
    }

    render() {
        return (
            <div className="container">
                <p>Container {this.state.id}</p>
                <pre><code>{ JSON.stringify(this.state.container, null, '\t') }</code></pre>
            </div>
        );
    }
}
