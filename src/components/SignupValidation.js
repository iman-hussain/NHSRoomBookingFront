import * as Yup from "yup";

/* Sign up Form validation requirements */
const signUpValidation = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too short")
    .max(20, "Too Large")
    .required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .min(6, "Password needs to be 6 Characters or more")
    .required("Required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
  firstName: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  expenseCode: Yup.string()
    .min(6, "6 Characters")
    .max(6, "6 Characters")
    .required("Required"),
});

/* Initial Sign up Form values */
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

export { signUpValidation, initialValues };
