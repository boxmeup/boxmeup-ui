import React, { Component } from 'react';
import AuthError from '../errors/AuthError.js';
import { Redirect, Link } from 'react-router-dom'
import {
	Alert,
	Button,
	ButtonGroup,
	Card,
	CardBlock,
	CardSubtitle,
	CardText,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	Input,
	Label,
	Progress,
	Table,
	UncontrolledDropdown
} from 'reactstrap';
import moment from 'moment';

export default class Containers extends Component {
	constructor(props) {
		super(props);
		const lastResponse = JSON.parse(localStorage.getItem('lastContainerResponse'));
		this.state = {
			containers: lastResponse ? lastResponse.containers : [],
			total: lastResponse ? lastResponse.meta.total : 0,
			error: null
		};
	}

	async componentWillMount() {
		try {
			const response = await this.props.auth.authorizedFetch('/api/container');
			localStorage.setItem('lastContainerResponse', JSON.stringify(response));
			this.setState({
				containers: response.containers,
				total: response.meta.total
			});
		} catch (e) {
			switch (e.constructor) {
				case AuthError:
					this.setState({
						error: e.message
					});
					break;
				default:
					console.error(e);
					const error = this.state.containers.length > 0 ?
						'Unable to get up-to-date containers. Data may be stale.' :
						'Unable to get containers.'
					this.setState({
						error: error
					})
			}
		}
	}

	// @todo break this into multiple components
	render() {
		const containers = this.state.containers.map(container => {
			return (
				<tr key={container.id}>
					<td><Label check><Input type="checkbox"/></Label></td>
					<td className="text-center"><Link to={'/containers/' + container.id}>{container.name}</Link></td>
					<td className="text-center hidden-sm-down">{container.container_item_count}</td>
					<td className="text-center hidden-sm-down">{moment(container.modified).fromNow()}</td>
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
		});
		return (
			this.props.auth.isAuthenticated() ? (
				<div className="container">
					{this.state.error &&
						<Alert color="danger">
							<strong>Error!</strong> {this.state.error}
						</Alert>
					}
					<div className="row">
						<div className="col-md-4 flex-md-last mb-2">
							<Card className="mb-2">
								<CardBlock>
									<Progress color="primary" value={this.state.total}>{this.state.total}/100</Progress>
									<CardText></CardText>
									<ButtonGroup>
										<Button color="success">Add Container</Button>
										<Button color="primary">Bulk Print</Button>
									</ButtonGroup>
								</CardBlock>
							</Card>
							<Card>
								<CardBlock>
									<CardSubtitle className="mb-2">Locations</CardSubtitle>
									<div className="form-check">
										<Label check>
											<Input type="checkbox" defaultChecked/>
											&nbsp;Garage
										</Label>
									</div>
									<div className="form-check">
										<Label check>
											<Input type="checkbox" defaultChecked/>
											&nbsp;Attic
										</Label>
									</div>
								</CardBlock>
							</Card>
						</div>
						<div className="col">
							{containers.length === 0 && <span>loading...</span>}
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
						</div>
					</div>
				</div>
			) : (
				<Redirect to={{
					pathname: '/login',
					state: { from: this.props.location, error: this.state.error }
				}}/>
			)

		);
	}
}