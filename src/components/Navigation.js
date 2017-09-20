import React from 'react';
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <nav>
                <ul>
                    {this.props.tabs.map((tab, index) => {
                        return (
                            <li key={index}><Link to={tab.id}>{tab.title}</Link></li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}