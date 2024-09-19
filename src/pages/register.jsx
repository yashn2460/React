import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUserAction, signupUserHandler } from "../redux/slice/signup";
import { toast } from "react-toastify";

const Register = () => {
  const { role } = useParams();
  const signupData = useSelector((state) => state.userSignup);
  const dispatch = useDispatch();
  useEffect(() => {
    if (signupData?.data?.status === 200) {
      dispatch(signupUserAction.signupSliceReset());
      toast.success(signupData?.data?.message, {
        position: toast?.POSITION?.TOP_RIGHT,
      });
      // navigate("/login")
    } else {
      toast.error(signupData?.data?.message, {
        position: toast?.POSITION?.TOP_RIGHT,
      });
      dispatch(signupUserAction.signupSliceReset());
    }
  }, [signupData.data]);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("required"),
    firstName: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("required"),
    lastName: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?!.*\s).{8,}$/,
        "Password must meet the criteria"
      )
      .required("required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
      role: role,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      dispatch(signupUserHandler(values));
    },
  });
  return (
    <div className="signup">
      <h1>{role == "admin" ? "Admin" : "Customer"} Registration</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div className="validation-error">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="name">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.errors.firstName ? (
          <div className="validation-error">{formik.errors.firstName}</div>
        ) : null}
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.errors.lastName ? (
          <div className="validation-error">{formik.errors.lastName}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div className="validation-error">{formik.errors.password}</div>
        ) : null}
        <label htmlFor="confirmPass">Confirm Password</label>
        <input
          id="confirmPass"
          name="confirmPass"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPass}
        />
        {formik.errors.confirmPass ? (
          <div className="validation-error"> {formik.errors.confirmPass}</div>
        ) : null}
        <input
          id="role"
          name="role"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.role}
          hidden
        />
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Register;
