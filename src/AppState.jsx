import React, { Component } from 'react';

class AppState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.setAppState = this.setAppState.bind(this);
        this.addAppState = this.addAppState.bind(this);
    }

    setAppState(newState, callback) {
        this.setState(newState, callback);
    }

    addAppState(componentChildren) {
        return React.Children.map(componentChildren, child => {
            let childProps = {};
            if (React.isValidElement(child)) {
                childProps = {
                    appState: this.state,
                    setAppState: this.setAppState
                };
            }
            if (child.props) {
                childProps.children = this.addAppState(child.props.children);
                return React.cloneElement(child, childProps);
            }
            return child;
        });
    }

    render() {
        return (
            <div className="AppState">
                {this.addAppState(this.props.children)}
            </div>
        )
    }
}

export default AppState;
