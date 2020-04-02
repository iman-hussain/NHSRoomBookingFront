import React, { useState } from "react";
import { Button, Form, Container, Col } from "react-bootstrap";
import Title from "../components/title";
import * as Yup from "yup";
import { Formik } from "formik";

/* The form will follow this schema */
const schema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  retypePassword: Yup.string().required(),
  firstName: Yup.string().required(),
  surname: Yup.string().required(),
  address: Yup.string().required(),
  phoneNumber: Yup.string().required(),
});

/* Initial Form values */
const initialValues = {
  username: "",
  firstName: "",
  surname: "",
  email: "",
  address: "",
  phoneNumber: "",
  expenseCode: "",
  password: "",
  retypePassword: "",
};

const Signup = () => {
  return (
    <Formik
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={values =>
        createUser(values)
      }
      initialValues={initialValues}
      isInitialValid={schema.isValidSync(initialValues)}
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
                  {"Username is required"}
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
                  {"First name is required"}
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
                  {"Surname is required"}
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
                  {"Address is required"}
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
                  {"Phone number is required"}
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
                  {"Expense code is required"}
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
                  {"Email is required"}
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
                  {"Password is required"}
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
                  {"Password is required"}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
              <Button
                variant="primary float-right"
                type="submit"
                onClick={() => console.log("Clicked")}
              >
                Sign up
              </Button>
            </Form>
          </Container>
        </div>
      )}
    </Formik>
  );
};

async function createUser(values) {
  console.log("creating user");
  console.log(values);
  await fetch("http://localhost:5000/users", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        USER_ID: 3, 
        USER_TYPE: 0, 
        USERNAME: values.username,
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
