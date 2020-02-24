import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './block.css';

export default class block extends Component {

    render() {
        return (
            <a href="/">
            <Container className="blockMenu">
                <div className="vertical-center">
                    <b>{this.props.title}</b>
                </div>
            </Container>
            </a>
        )
    }
}