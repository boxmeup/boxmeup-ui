import React from 'react';
import { Redirect } from 'react-router-dom'

export default class PrivateRoute extends React.Component {
	render() {
		const Component = this.props.component;
		return (
			this.props.auth.isAuthenticated() ? (
				<Component {...this.props}/>
			) : (
				<Redirect to={{
					pathname: '/login',
					state: { from: this.props.location }
				}}/>
			)
		);
	}
}