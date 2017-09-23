import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Label,
    Input
} from 'reactstrap';

export default class LocationFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMore: false
        }
        this.toggleMore = this.toggleMore.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.selectedLocations = new Set();
        console.log(this.selectedLocations);
    }

    toggleMore(e) {
        e.preventDefault();
        this.setState({
            isMore: !this.state.isMore
        });
    }

    onSelected(e) {
        const id = parseInt(e.target.name, 10);
        if (!this.selectedLocations.has(id)) {
            this.selectedLocations.add(id);
        } else {
            this.selectedLocations.delete(id);
        }
        this.props.onLocationSelected(Array.from(this.selectedLocations));
    }

    render() {
        const locations = (this.props.locations || []).map(location => {
            return (
                <div key={location.id} className="form-check">
                    <Label check>
                        <Input type="checkbox" name={location.id} onChange={this.onSelected}/>
                        &nbsp;{location.name} (<i>{location.container_count}</i>)
                    </Label>
                </div>
            );
        });
        return (
            <div>
                <h5>Locations</h5>
                {!locations.length && <Link to="/locations/add">Try creating some locations.</Link>}
                {locations.length > 0 && locations.slice(0, 3)}
                {locations.length > 3 && !this.state.isMore && <p className="pull-right"><a href="" onClick={this.toggleMore}>...more</a></p>}
                {locations.length > 3 && this.state.isMore && locations.slice(4)}
                {locations.length > 3 && this.state.isMore && <p className="pull-right"><a href="" onClick={this.toggleMore}>...less</a></p>}
            </div>
        );
    }
}
