import React, { useState } from "react";
import { Button, Form, Container, Col } from "react-bootstrap";
import Title from "../components/title";
import { Formik } from "formik";
import {signUpValidation, initialValues} from '../components/SignupValidation';
import { Redirect } from "react-router-dom";

const Signup = () => {
  const [redirect, settingRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/login" />;
    }
  };

  return (
    <Formik
      validationSchema={signUpValidation}
      validateOnChange={false}
      onSubmit={values =>{
        createUser(values)
        settingRedirect(true)
      }
      }
      initialValues={initialValues}
      isInitialValid={signUpValidation.isValidSync(initialValues)}
    >
      {({ handleSubmit, handleChange, values, touched, isInvalid, errors }) => (
        <div>
          <Title title="Sign up"></Title>
          <Container>
            <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
            <Form.Group as={Col} controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                  placeholder="Username:"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

            <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                  placeholder="First name:"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="surname"
                  name="surname"
                  value={values.surname}
                  onChange={handleChange}
                  isInvalid={!!errors.surname}
                  placeholder="Surname:"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.surname}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  placeholder="Enter address:"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            <Form.Row>

              <Form.Group as={Col} controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                  placeholder="Enter phone number:"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formExpenseCode">
                <Form.Label>Expense Code</Form.Label>
                <Form.Control
                  type="expenseCode"
                  name="expenseCode"
                  value={values.expenseCode}
                  onChange={handleChange}
                  isInvalid={!!errors.expenseCode}
                  placeholder="Enter expense code:"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expenseCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
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
                  {errors.email && touched.email && errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            <Form.Row>

              <Form.Group as={Col} controlId="formBasicPassword">
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
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group as={Col} controlId="formBasicPassword">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  type="password"
                  name="retypePassword"
                  values={values.retypePassword}
                  onChange={handleChange}
                  isInvalid={!!errors.retypePassword}
                  placeholder="Retype Password: "
                />
                <Form.Control.Feedback type="invalid">
                  {errors.retypePassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
              <Button
                variant="primary float-right"
                type="submit"
              >
                Sign up
              </Button>
            </Form>
            {renderRedirect()}
          </Container>
        </div>
      )}
    </Formik>
  );
};

async function createUser(values) {
  await fetch("http://localhost:5000/users", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        USER_ID: Math.floor(Math.random() * Math.floor(1000)),
        USER_TYPE: 0, 
        USERNAME: values.username,
        PASSWORD: values.password,
        FIRST_NAME: values.firstName, 
        SURNAME: values.surname, 
        EMAIL: values.email, 
        ADDRESS: values.address, 
        PHONE_NUMBER: values.phoneNumber, 
        EXPENSE_CODE: values.expenseCode
      })
    })
    .then(res => console.log(res))
    .then(
      (result) => {
        console.log(result);
      }
    );
}

export default Signup;
