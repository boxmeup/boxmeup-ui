import React, { Component } from 'react';
import {
    Label,
    Input
} from 'reactstrap';

export default class LocationFilter extends Component {
    render() {
        return (
            <div>
                <h5>Locations</h5>
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
            </div>
        );
    }
}
