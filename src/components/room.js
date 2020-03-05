import React, { Component } from 'react'
import { Container, Card, Button } from 'react-bootstrap'

export default class Room extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="/roomBooking">
            <Container>
            <Card style={{ width: '100%', marginBottom:'1em' }}>
                <Card.Img variant="top" src={"/roomPics/room"+this.props.picId+".jpg"} />
                <Card.Body>
                    <Card.Title>{this.props.roomName}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </Container>
            </a>
        )
    }
}