import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import "./Login.css";
import Title from "../components/title";
import { GoogleLogin } from "../components/GoogleLogin.js";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux"; // userSelector grabs state - in place of mapStateToProps
import { userLoggedIn, getUserDetails } from "../Redux/userInfo";

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
      expenseCode: ""
    }
  ]);
  //console.log("Logged: " + JSON.stringify(loggedIn));
  //console.log("User data: " + JSON.stringify(userData));
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
                      (await attemptLogin(values, setLoginState, dispatch))
                        ? setLoginState(true)
                        : setLoginState(false);
                    }}
                  >
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
      )}
    </div>
  );
};

/*
  Send Values
  Check if they exist in database
  Dispatch with userData + bookings
  Return true;
*/
async function attemptLogin(values, setLoginState, dispatch) {
  let userDetails = "";
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
  })
    .then(response => response.json())
    .then(json => {
      //console.log(JSON.stringify(json.rows));
      if (json.success) {
        userDetails = json.rows.rows[0];
        return true;
      } else {
        return false;
      }
    });
  let bookings = await getBookings()
  userDetails.push(bookings);
  dispatch(getUserDetails(userDetails));
  return response;
}

async function getBookings(){
  const bookingResponse = await fetch("http://localhost:5000/bookings/user/1");
  const responseData = await bookingResponse.json();
  let bookings = responseData.rows.rows;
/*   bookings = await bookings.map((data, i) => {
    bookings[i].push('#' + Math.floor(Math.random() * 16777215).toString(16))
  }); */
  return bookings;
}
export default Login;
