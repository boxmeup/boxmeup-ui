import React, { Component } from 'react';
import {
    Card,
    CardBlock,
    CardHeader,
    Progress
} from 'reactstrap';

import LocationFilter from './LocationFilter.jsx';

export default class Panel extends Component {
    render() {
        return (
            <Card className="mb-2">
                <CardHeader>
                    <Progress color="primary" value={this.props.total} max={this.props.max}>{this.props.total}/{this.props.max}</Progress>
                </CardHeader>
                <CardBlock>
                    <LocationFilter />
                </CardBlock>
            </Card>
        );
    }
}
