import React, { Component } from 'react';

class LoginPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			error: '',
			token: localStorage.getItem('auth_token') || ''
		};
	}

	componentWillMount() {
		if (this.state.token) {
			this.props.history.replace("/");
		}
	}

	async processForm(e) {
		e.preventDefault();
		this.setState({
			error: ''
		});
		try {
			const response = await fetch('/api/user/login', {
				method: 'POST',
				body: new FormData(e.target)
			});
			if (response.status === 500) {
				throw new Error('Unable to login at this time.');
			}
			const body = await response.json();
			if (!response.ok) {
				throw new Error(body.text);
			}
			localStorage.setItem('auth_token', body.token);
			this.props.history.push("/");
		} catch (e) {
			this.setState({
				error: e.message
			});
		}
	}

	render() {
		return (
			<div className="container">
				<form
					action="/login"
					onSubmit={this.processForm.bind(this)}>
					<div style={{maxWidth: 330 + 'px', margin: '0 auto'}}>
						<h2 className="mb-2">Log In</h2>
						{this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
						<input type="email" name="email" className="form-control mb-2" placeholder="email address" required autoFocus/>
						<input type="password" name="password" className="form-control mb-2" placeholder="password" required/>
						<button type="submit" className="btn btn-primary btn-block rounded-bottom">Login</button>
					</div>
				</form>
			</div>
		)
	}
}

export default LoginPage;