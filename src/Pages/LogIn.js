import React, {useState} from "react";
import { Button, Form, Container } from "react-bootstrap";
import "./Login.css";
import Title from "../components/title";
import { GoogleLogin } from "../components/GoogleLogin.js";
import { Redirect } from 'react-router';
import * as Yup from "yup";
import { Formik } from "formik";

/* The form will follow this schema */
const schema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required()
});

/* Initial Form values */
const initialValues = {
  email: "",
  password: ""
};

function Login() {
    return (
    <Formik
    validationSchema={schema}
    validateOnChange={false}
    onSubmit={values =>
      attemptLogin(values)
    }
    initialValues={initialValues}
    isInitialValid={schema.isValidSync(initialValues)}
    >
      {({ handleSubmit, handleChange, values, touched, isInvalid, errors }) => (
        <div className="Login">
          <Title title="Log In"></Title>
          <Container>
          <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter Email:"
                />
                <Form.Control.Feedback type="invalid">
                  {"Email is required"}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  values={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  placeholder="Password: "
                />
                <Form.Control.Feedback type="invalid">
                  {"Password is required"}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary float-right" type="submit"> 
                Submit
              </Button>
              <br></br>
              <br></br>
              <br></br>
              <hr></hr>
              <div className="GoogleLogin">
                <GoogleLogin show={true} />
              </div>
            </Form>
          </Container>
        </div>
      )}
    </Formik>
  );
}

function attemptLogin(values){
    console.log(values);
}

export default Login;
