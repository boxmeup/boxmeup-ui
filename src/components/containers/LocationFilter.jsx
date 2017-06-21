import React, { Component } from 'react';
import {
    Card,
    CardBlock,
    CardSubtitle,
    Label,
    Input
} from 'reactstrap';

export default class LocationFilter extends Component {
    render() {
        return (
            <Card>
                <CardBlock>
                    <CardSubtitle className="mb-2">Locations</CardSubtitle>
                    <div className="form-check">
                        <Label check>
                            <Input type="checkbox" defaultChecked />
                            &nbsp;Garage
                        </Label>
                    </div>
                    <div className="form-check">
                        <Label check>
                            <Input type="checkbox" defaultChecked />
                            &nbsp;Attic
                        </Label>
                    </div>
                </CardBlock>
            </Card>
        );
    }
}
