import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ContainerRow from './ContainerRow.jsx';

export default class ContainerList extends Component {
    constructor(props) {
        super(props);
        this.toggleContainer = this.toggleContainer.bind(this);
        this.selectedContainers = new Set();
    }

    toggleContainer(label) {
        if (this.selectedContainers.has(label)) {
            this.selectedContainers.delete(label);
        } else {
            this.selectedContainers.add(label);
        }
        this.props.onContainerSelected(this.selectedContainers);
    }

    render() {
        const containers = this.props.containers.map(container => {
            return <ContainerRow key={container.id} container={container} onContainerSelected={this.toggleContainer} />
        });
        return (
            <Table responsive bordered={false}>
                <thead>
                    <tr>
                        <th></th>
                        <th className="text-center">Name</th>
                        <th className="text-center hidden-sm-down">Items</th>
                        <th className="text-center hidden-sm-down">Last Modified</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {containers}
                </tbody>
            </Table>
        );
    }
}

