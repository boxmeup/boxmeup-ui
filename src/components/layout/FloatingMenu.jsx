import React, { Component } from 'react';

import './floatingmenu.css';
import { Link } from 'react-router-dom'

import { UncontrolledTooltip } from 'reactstrap'

export default class FloatingMenu extends Component {
    render() {
        this.props.items.reverse();
        const items = this.props.items.map((item, key) => {
            return (
                <li key={key}>
                    <Link id={"tt-fm-" + key} to={item.link} className={item.color}><i className={"fa fa-" + item.icon}/></Link>
                    {item.tooltip && <UncontrolledTooltip placement="left" target={"tt-fm-" + key}>{item.tooltip}</UncontrolledTooltip>}
                </li>
            )
        });
        return (
            <ul className="floating-menu">
                {items}
            </ul>
        );
    }
}
