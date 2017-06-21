import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBlock,
    CardHeader,
    Progress
} from 'reactstrap';

export default class Panel extends Component {
    render() {
        return (
            <Card className="mb-2">
                <CardHeader>
                    <Progress color="primary" value={this.props.total} max={this.props.max}>{this.props.total}/{this.props.max}</Progress>
                </CardHeader>
                <CardBlock>
                    <Button color="success" block>Add Container</Button>
                    {this.props.selectedContainers.size > 0 && <Button color="primary" block>Bulk Print</Button>}
                </CardBlock>
            </Card>
        );
    }
}
