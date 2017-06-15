import { Component } from 'react';

class Logout extends Component {

	componentWillMount() {
		localStorage.removeItem('auth_token');
		this.props.history.replace('/');
	}

	render() {
		return null;
	}
}

export default Logout;