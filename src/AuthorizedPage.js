import { Component } from 'react';

export default class AuthorizedPage extends Component {
	componentWillMount() {
		if (!localStorage.getItem('auth_token')) {
			this.props.history.push('/login');
		}
	}

	render() {
		return this.props.children;
		// if (localStorage.getItem('auth_token')) {
		// 	console.log(this.props);
		// 	return this.props.children;
		// }
		// return null;
	}
}