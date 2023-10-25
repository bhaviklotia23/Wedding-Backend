const yup = require("yup");

exports.registrationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
  role: yup.string().required("User role is required"),
});

exports.loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
});
