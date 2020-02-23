import React from "react";
import { Button, Form, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import "./Login.css";

function Login() {
    return (
        <div className="Login">
            <div class="title">
                <a href="/" id="backIcon">
                    <h4><FontAwesomeIcon icon={faArrowAltCircleLeft} /></h4>
                </a>
                <h4>
                    Log In
                </h4>
            </div>
            <Container>
                <form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary float-right" type="submit" >
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    )}

export default Login;
