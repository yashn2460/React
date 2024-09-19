import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUserAction, loginUserHandler } from "../redux/slice/login";
import { toast } from "react-toastify";

const Login = () => {
  const { role } = useParams();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (loginData?.data?.status === 200) {
      dispatch(loginUserAction.loginSliceReset());
      toast.success(loginData?.data?.message, {
        position: toast?.POSITION?.TOP_RIGHT,
      });
      // navigate("/login")
    } else {
      toast.error(loginData?.data?.message, {
        position: toast?.POSITION?.TOP_RIGHT,
      });
      dispatch(loginUserAction.loginSliceReset());
    }
  }, [loginData.data]);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?!.*\s).{8,}$/,
        "Password must meet the criteria"
      )
      .required("required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: role,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      dispatch(loginUserHandler(values));
    },
  });
  return (
    <div className="signup">
      <h1>{role == "admin" ? "Admin" : "Customer"} Login</h1>
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
export default Login;
