import React from "react";
import { Button, Form, Container } from "react-bootstrap";
import "./Login.css";
import Title from "../components/title";

function Login() {
    return (
        <div className="Login">
            <Title title="Log In"></Title>
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
