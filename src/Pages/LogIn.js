import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import "./Login.css";
import Title from "../components/title";
import { GoogleLogin } from "../components/GoogleLogin.js";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux"; // userSelector grabs state - in place of mapStateToProps
import { userLoggedIn } from "../Redux/userInfo";

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

/*Determines whether to show the login functionality or sign out depending on stored data.*/
const Login = () => {
  const [loginState, setLoginState] = useState(false);
  const dispatch = useDispatch(); // Prevents us from needing mapDispatch and connect
  const loggedIn = useSelector(state => state.userInfo);
  const [userData, setData] = useState([
    {        
      username: "",
      userType: "",
      userID: "",
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      expenseCode: "",}
  ]);
  console.log("Logged: " + loggedIn);
  console.log("User data: " + JSON.stringify(userData));
  return (
    <div>
      {loggedIn.email ? (
        <div>
          <Redirect to="/" />
        </div>
      ) : (
        <Formik
          validationSchema={schema}
          validateOnChange={false}
          initialValues={initialValues}
          isInitialValid={schema.isValidSync(initialValues)}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            isInvalid,
            errors
          }) => (
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
                  <Button
                    variant="primary float-right"
                    type="submit"
                    onClick={async e => {
                      (await attemptLogin(values, setLoginState, setData))
                        ? dispatch(
                            userLoggedIn({
                              username: userData.username,
                              userType: userData.userType,
                              userID: userData.userID,
                              name: userData.name,
                              email: userData.email,
                              address: userData.address,
                              phoneNumber: userData.phoneNumber,
                              expenseCode: userData.expenseCode,
                              loggedIn: true
                            })
                          )
                        : dispatch(
                            userLoggedIn({ email: "", loggedIn: false })
                          );
                    }}
                  >
                    Submit
                  </Button>
                  {{ loginState } === false ? <p>Not Wrong!</p> : <p>Wrong!</p>}
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
      )}
    </div>
  );
};

/*  Used for displaying user details and signing out.
        <p>{loggedIn.username}</p>
        <p>{loggedIn.userType}</p>
        <p>{loggedIn.name}</p>
        <p>{loggedIn.email}</p>
        <p>{loggedIn.address}</p>
        <p>{loggedIn.phoneNumber}</p>
        <p>{loggedIn.expenseCode}</p>
        <Button onClick={e => dispatch(userLoggedIn({email: "", loggedIn: false}))}>Sign Out</Button>*/

async function attemptLogin(values, setLoginState, setData) {
  console.log("Attempt Login");
  console.log(values);
  const response = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password
    })
  }).then(response => response.json())
  .then((json) => {
    console.log(JSON.stringify(json.rows));
    if(json.success) {
      setData({        
        username: json.rows.rows[0][2],
        userType: json.rows.rows[0][1],
        userID: json.rows.rows[0][0],
        name: json.rows.rows[0][3] + " " + json.rows.rows[0][4],
        email: json.rows.rows[0][5],
        address: json.rows.rows[0][6],
        phoneNumber: json.rows.rows[0][7],
        expenseCode: json.rows.rows[0][8],})
      setLoginState(true);
      return true;
    } else {
      setLoginState(false);
      return false;
    }
  });
  console.log("Response: " + response);
  return response;
}

export default Login;

/*    console.log(response);
    if (response.ok) {
      setLoginState(true);
      return true;
    } else {
      setLoginState(false);
      console.log(response);
      return false;
    }*/