import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import logo from '../logo-icon.png';

class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.auth = props.auth;
		this.processForm = this.processForm.bind(this);
		this.state = {
			error: this.props.location.state.error || '',
			token: localStorage.getItem('auth_token') || ''
		};
	}

	componentWillMount() {
		if (this.auth.isAuthenticated()) {
			this.props.history.replace("/");
		}
	}

	async processForm(e) {
		e.preventDefault();
		this.setState({
			error: ''
		});
		try {
			await this.auth.authenticate(e.target);
			this.props.history.push(this.props.location.state.from.pathname || '/');
		} catch (e) {
			this.setState({
				error: e.message
			});
		}
	}

	render() {
		return (
			<div className="Login container">
				<div className="row">
					<div className="Login-container col-md-4 offset-md-6">
						<div className="Login-header">
							<img src={logo} alt=""/>
							<h2 className="align-top">Boxmeup</h2>
						</div>
						<form
							action="/login"
							onSubmit={this.processForm}>
							{this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
							<input type="email" name="email" className="form-control mb-2" placeholder="email address" required autoFocus/>
							<input type="password" name="password" className="form-control mb-2" placeholder="password" required/>
							<button type="submit" className="btn btn-primary btn-block mb-2">Login</button>
							<Link to="/forgot_password">Forgot your password?</Link>
						</form>
						<div className="Login-footer">
							<span>Don't have an account.</span>&nbsp;
							<Link to="/signup">Create one!</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LoginPage;