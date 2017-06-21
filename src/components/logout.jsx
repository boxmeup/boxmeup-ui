import { Component } from 'react';

class Logout extends Component {

    componentWillMount() {
        this.props.auth.deauthenticate();
        this.props.history.replace('/');
    }

    render() {
        return null;
    }
}

export default Logout;
