import React, { Component } from 'react';
import {
    Input,
    Label,
    UncontrolledTooltip
} from 'reactstrap';
import { Link } from 'react-router-dom'
import moment from 'moment';

export default class ContainerRow extends Component {
    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
    }
    onSelected(e) {
        this.props.onContainerSelected(e.target);
    }
    render() {
        return (
            <tr>
                <td><Label check><Input type="checkbox" value={this.props.container.id} onChange={this.onSelected} /></Label></td>
                <td className="text-center"><Link to={'/containers/view/' + this.props.container.id}>{this.props.container.name}</Link></td>
                <td className="text-center hidden-sm-down">{this.props.container.container_item_count}</td>
                <td className="text-center hidden-sm-down">
                    <span id={"tt-mod-" + this.props.container.id}>{moment(this.props.container.modified).fromNow()}</span>
                    <UncontrolledTooltip placement="top" target={"tt-mod-" + this.props.container.id}>{this.props.container.modified}</UncontrolledTooltip>
                </td>
            </tr>
        );
    }
}

