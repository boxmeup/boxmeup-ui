import React, { Component } from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    UncontrolledDropdown
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
                <td className="text-center hidden-sm-down">{moment(this.props.container.modified).fromNow()}</td>
                <td className="text-right">
                    <UncontrolledDropdown tether>
                        <DropdownToggle caret>
                            More
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Delete Container</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    }
}

